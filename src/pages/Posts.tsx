import { useEffect } from "react";
import { Link } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/postSlice";
import { RootState, AppDispatch } from "../store";


const Posts = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { posts, loading, error } = useSelector((state: RootState) => state.post)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])


    return (
        <div className="container py-5">
        <h1 className="display-4 text-center mb-4">Posts</h1>
        <p className="lead text-center mb-5">Welcome to the Posts page</p>

        {loading && <p className="text-center">Loading posts...</p>}
        {error && <p className="text-center text-danger">Error loading posts: {error}</p>}

        <div className="row">
            {posts.map((post) => (
                <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm border-light">
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark">
                                    <strong>{post.user?.name}</strong>: {post.title}
                                </Link>
                            </h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}
export default Posts;