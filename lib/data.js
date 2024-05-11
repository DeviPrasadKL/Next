let posts = [
    {
        id: "1",
        title: "First01",
        desc: "Sample JSON",
        date: '2024-05-09T10:28:07.003Z'
    }
];

export const getPosts = () => posts;

export const addPosts = (post) => posts.push(post);

export const deletePosts = (id) => {
    posts = posts.filter(post => post.id !== id);
    return posts
};

export const updatePosts = (id, title, desc) => {
    const post = posts.find(post => post.id === id);
    if (post) {
        post.title = title;
        post.desc = desc;
    } else {
        throw new Error("No posts found")
    }
};

export const getById = (id) => { return posts.find(post => post.id === id) };
