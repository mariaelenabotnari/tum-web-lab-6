function Pagination({ currentPage, totalPages, setCurrentPage }) {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
            >
                <i className="fas fa-chevron-left"></i> Prev
            </button>

            <span>Page {currentPage} of {totalPages}</span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
            >
                Next <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
}

export default Pagination;