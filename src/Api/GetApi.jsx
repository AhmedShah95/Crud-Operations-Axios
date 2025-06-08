// GetApi.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data; // ✅ return only the array, not the full response
};

export const deletePost = async (id) => {
  return await api.delete(`/posts/${id}`);
};
export const addPost = async(post)=>{
    return api.post('/posts', post);
};
export const updatePost = async(id, post)=>{
    return api.put(`/posts/${id}` , post)
}