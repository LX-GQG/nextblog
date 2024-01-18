function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <>
            <ul className="pagination">
                {pageNumbers.map((page) => (
                <li
                    key={page}
                    className={page === currentPage ? "active" : ""}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </li>
                ))}
            </ul>
            <style>{`
                .pagination {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 20px 0;
                }
                .pagination li {
                    list-style: none;
                    margin: 0 5px;
                    padding: 5px 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .pagination li:hover {
                    background: #ccc;
                }
                .pagination li.active {
                    background: #000;
                    color: #fff;
                }
            `}</style>
        </>
    );
}

export default Pagination;