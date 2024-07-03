import { cookies } from 'next/headers'
import { deletePosts, getById, updatePosts } from '../../../../lib/data';

export async function GET(request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    try {
        const id = await request.url.split("api/")[1];
        const post = getById(id);

        if (post) {
            console.log(post);

            return new Response(JSON.stringify(post), {
                status: 200,
                headers: { 'Set-Cookie': `token=${token}` },
            })

        } else {
            return new Response(JSON.stringify({ message: "Error" }), {
                status: 404,
            })
        }
    } catch (error) {
        return new Response({ message: "Error", error }, {
            status: 500,
        })
    }
}

export async function PUT(request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    try {

        const { title, desc } = await request.json();
        const id = await request.url.split("api/")[1];
        updatePosts(id, title, desc);

        return new Response(JSON.stringify({ message: "Updated Successfully" }), {
            status: 200,
            headers: { 'Set-Cookie': `token=${token}` },
        })

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error", error }), {
            status: 500,
        })
    }
}

export async function DELETE(request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    try {

        const id = await request.url.split("api/")[1];
        deletePosts(id);

        return new Response(JSON.stringify({ message: "Deleted Successfully" }), {
            status: 200,
            headers: { 'Set-Cookie': `token=${token}` },
        })

    } catch (error) {
        return new Response({ message: "Error", error }, {
            status: 500,
        })
    }
}