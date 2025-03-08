import { useEffect } from "react";
import { Link } from "react-router"; 
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/postSlice";
import { RootState, AppDispatch } from "../store";

const LatestPosts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const latestPosts = posts.slice(0, 3);

    return (
        <div className="container py-4">
            <h2 className="text-center my-5">Latest Posts</h2>

            {loading && <p className="text-center">Loading posts...</p>}
            {error && <p className="text-center text-danger">Error loading posts: {error}</p>}

            <div className="row">
                {latestPosts.map((post: any) => (
                    <div key={post.id} className="col-md-4 mb-3">
                        <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark">
                            <div className="card shadow-sm border-light">
                                <div className="card-body">
                                    <h5 className="fw-bold">{post.title}</h5>
                                    <p>Author: <strong>{post.user?.name}</strong></p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestPosts;
