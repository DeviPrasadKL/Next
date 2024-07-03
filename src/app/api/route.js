import { cookies } from 'next/headers'
import { addPosts, getPosts } from '../../../lib/data'

export async function GET(request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    try {
        const posts = getPosts();
        const data = JSON.stringify(posts);

        return new Response(data, {
            status: 200,
            headers: { 'Set-Cookie': `token=${token}` },
        })

    } catch (error) {
        return new Response({ message: "Error", error }, {
            status: 500,
        })
    }
}

export async function POST(request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    const { title, desc } = await request.json();
    try {
        const post = {
            id: Date.now().toString(),
            title,
            desc,
            date: new Date()
        }

        addPosts(post)

        return new Response(JSON.stringify(post), {
            status: 201,
            headers: { 'Set-Cookie': `token=${token}` },
        })

    } catch (error) {
        return new Response({ message: "Error", error }, {
            status: 500,
        })
    }
}