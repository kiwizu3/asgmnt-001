import { useEffect, useState } from "react";
import { Link } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/postSlice";
import { RootState, AppDispatch } from "../store";

const Posts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error } = useSelector((state: RootState) => state.post);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    // Get the current posts for the current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calculate page numbers
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container-fluid other-bg py-5">
            <h1 className="display-4 text-center mb-4">Posts</h1>
            <p className="lead text-center mb-5">Welcome to the Posts page</p>

            {loading && <p className="text-center">Loading posts...</p>}
            {error && <p className="text-center text-danger">Error loading posts: {error}</p>}

            <div className="row mx-5">
                {currentPosts.map((post: any) => (
                    <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                        <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark">
                            <div className="card shadow-sm border-light">
                                <div className="card-body">
                                    <h5 className="fw-bold">

                                        {post.title}

                                    </h5>
                                    <p>Author: <strong>{post.user?.name}</strong></p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {currentPage > 1 && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                                Previous
                            </button>
                        </li>
                    )}

                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(number)}>
                                {number}
                            </button>
                        </li>
                    ))}

                    {currentPage < totalPages && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                                Next
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Posts;
