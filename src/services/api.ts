const BASE_URL = 'https://jsonplaceholder.typicode.com';
const RANDOM_USER_API = 'https://randomuser.me/api/1.4/?results=10';

const fetchUsersAPI = async () => {
    const response = await fetch(RANDOM_USER_API);
    const data = await response.json();
    console.log("Fetched data:", data);
    return data.results.map((user: any) => ({
      id: user.index,
      createdAt: user.registered.date,
      email: user.email,
      phone: user.phone,
      registered: user.registered.date,
      birthday: user.dob.date,
      name: `${user.name.first} ${user.name.last}`,
      img: user.picture.large,
      avatar: user.picture.thumbnail,
      city: user.location.city,
    }));
  };

const fetchUserAPI = async () => {
  const response = await fetch(RANDOM_USER_API);
  const data = await response.json();
  console.log("Fetched data:", data);
  return data.results.map((user: any) => ({
      id: user.index,
      name: `${user.name.first} ${user.name.last}`,
      avatar: user.picture.thumbnail,
      city: user.location.city,
  }));
} 

const fetchAllPosts = async () => {
    const response = await fetch(`${BASE_URL}/posts`);
    if(!response.ok) throw new Error('Failed to fetch posts');
    
    return response.json();
}

const fetchSinglePost = async(postId: number) =>{
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    if(!response.ok) throw new Error('Failed to fetch post');

    return response.json();
}

const fetchPostComments  = async (postId: number) => {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`)
  if (!response.ok) throw new Error('Failed to fetch comments')
  return response.json()
}

export {fetchAllPosts, fetchSinglePost, fetchPostComments, fetchUsersAPI, fetchUserAPI};