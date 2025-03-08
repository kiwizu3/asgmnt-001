import React from 'react';
import { Link } from 'react-router';

interface PostProps {
    post: any;
    showAuthor: boolean;
    linkToPost: boolean;
}

const PostCard: React.FC<PostProps> = ({ post, showAuthor = true, linkToPost = true }) => {
    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark">
                <div className="card shadow-sm border-light">
                    <div className="card-body">
                        {linkToPost ? (
                            <h5 className="fw-bold">{post.title}</h5>

                        ) : (
                            <h5 className="fw-bold">{post.title}</h5>
                        )}

                        {showAuthor && (
                            <p>Author: <strong>{post.user?.name}</strong></p>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PostCard;
