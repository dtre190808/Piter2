function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => onPageChange(i + 1)} disabled={currentPage === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
    );
  }
  
  export default Pagination;