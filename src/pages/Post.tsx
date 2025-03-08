import { useEffect } from "react";
import { Link, useParams } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { fetchPost, fetchComments, fetchUsers } from "../features/postSlice";
import { RootState, AppDispatch } from "../store";


const Post = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { postId } = useParams<{ postId: string }>(); // Get postId from the URL params
  
    const { post, comments, loading, error, users } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        console.log("Dispatching fetchUsers");
        if (users.length === 0) {
            dispatch(fetchUsers()).then(() => {
                if (postId) {
                    dispatch(fetchPost(Number(postId))); // Fetch the specific post
                    dispatch(fetchComments(Number(postId))); // Fetch comments for the post
                }
            });
        } else {
            if (postId) {
                dispatch(fetchPost(Number(postId))); // Fetch the specific post
                dispatch(fetchComments(Number(postId))); // Fetch comments for the post
            }
        }
    }, [dispatch, postId, users.length]);


    const renderComments = () => {
        if (loading) {
            return <p className="text-center">Loading comments...</p>;
        }

        if (error) {
            return <p className="text-center text-danger">Error loading comments: {error}</p>;
        }

        if (comments.length === 0) {
            return <p className="text-center">No comments yet.</p>;
        }

        return (
            <div className="list-group">
            {comments.map((comment) => (
                <div key={comment.id} className="list-group-item mb-3">
                    <div className="d-flex align-items-center mb-2">
                        <img 
                            src={comment.user.avatar} 
                            alt={comment.user.name} 
                            className="rounded-circle" 
                            width="50" 
                            height="50" 
                        />
                        <span className="ms-3 fw-bold">{comment.user.name}</span>
                    </div>
                    <p className="mb-2">{comment.body}</p>
                </div>
            ))}
        </div>
        );
    };


    return (
        <div className="container py-5">
        <Link to="/posts" className="btn btn-outline-primary my-5">← Back to Posts</Link>

        {post ? (
            <div className="post mb-5">
                <h1 className="display-4">{post.title}</h1>
                <div className="d-flex align-items-center mb-4">
                    <img 
                        src={post.user.avatar} 
                        alt={post.user.name} 
                        className="rounded-circle" 
                        width="60" 
                        height="60" 
                    />
                    <div className="ms-3">
                        <h5 className="fw-bold">{post.user.name}</h5>
                    </div>
                </div>
                <p className="lead">{post.body}</p>
            </div>
        ) : (
            <p className="text-center">Post not found.</p>
        )}

        <div className="comments mt-5">
            <h3 className="h4 mb-4">Comments</h3>
            {renderComments()}
        </div>
    </div>
    );
}

export default Post;