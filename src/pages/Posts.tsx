import { useEffect, useState } from "react";
import { Link } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/postSlice";
import { RootState, AppDispatch } from "../store";
import Pagination from "../components/Pagination";

const Posts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error } = useSelector((state: RootState) => state.post);

    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(posts);
    const postsPerPage = 6;

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

 
    useEffect(() => {
        setResults(posts);
    }, [posts]);

  
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const displayedPosts = query ? results : posts.slice(indexOfFirstPost, indexOfLastPost);

    const truncateText = (text: string, wordLimit: number = 5) => {
        return text.split(" ").slice(0, wordLimit).join(" ") + (text.split(" ").length > wordLimit ? "..." : "");
    };

   
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        setQuery(searchTerm);

        if (!searchTerm) {
            setResults(posts);
        } else {
            setResults(posts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.body.toLowerCase().includes(searchTerm)
            ));
        }
    };

    return (
        <div className="container-fluid py-5 other-bg">
            <h1 className="text-center mt-5 text-white">Posts</h1>
            <p className="lead text-center mb-5 text-white">Welcome to the Posts page</p>
            
       
            <div className="text-center mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search posts..."
                    className="form-control w-50 mx-auto"
                />
            </div>

            {loading && <p className="text-center">Loading posts...</p>}
            {error && <p className="text-center text-danger">Error loading posts: {error}</p>}

            <div className="row">
                {displayedPosts.map((post: any) => (
                    <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                        <Link to={`/posts/${post.id}`} className="text-decoration-none text-dark">
                            <div className="card shadow-sm border-light">
                                <div className="card-body">
                                    <h5 className="fw-bold">{post.title}</h5>
                                    <p>{truncateText(post.body)}</p>
                                    <small>Author: <strong>{post.user?.name}</strong></small>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {!query && (
                <Pagination 
                    currentPage={currentPage} 
                    postsPerPage={postsPerPage} 
                    totalPosts={posts.length} 
                    paginate={paginate} 
                />
            )}
        </div>
    );
}

export default Posts;
