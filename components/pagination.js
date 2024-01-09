// Pagination.js

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <section className="flex justify-center mt-4">
      <button
        className="text-blue-950 mr-4"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`text-blue-950 mr-4 ${
            currentPage === pageNumber ? "font-bold" : ""
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="text-blue-950 mr-4"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </section>
  );
};

export default Pagination;
