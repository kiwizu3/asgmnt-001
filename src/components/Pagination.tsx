interface PaginationProps {
    currentPage: number;
    postsPerPage: number;
    totalPosts: number;
    paginate: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }: PaginationProps) => {
    // Calculate total pages and create page numbers
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {currentPage > 1 && (
                    <li className="page-item">
                        <button className="page-link  me-2" onClick={() => paginate(currentPage - 1)}>
                            Previous
                        </button>
                    </li>
                )}

                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button className="page-link me-2" onClick={() => paginate(number)}>
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
    );
}

export default Pagination;
