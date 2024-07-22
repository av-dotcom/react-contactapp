type PaginationType = {
  currentPage: number;
  getAllContacts: (page: number) => void;
  data: any;
};

const Pagination = ({ currentPage, getAllContacts, data }: PaginationType) => {
  return (
    <div className="join flex justify-center mt-10">
      <button
        className={`join-item btn ${currentPage === 0 ? "disabled" : ""}`}
        onClick={() => getAllContacts(currentPage - 1)}
        disabled={currentPage === 0}
      >
        &laquo;
      </button>

      {data &&
        [...Array(data.totalPages).keys()].map((page) => (
          <button
            key={page}
            className={`join-item btn ${
              currentPage === page ? "btn-active" : ""
            }`}
            onClick={() => getAllContacts(page)}
          >
            {page + 1}
          </button>
        ))}

      <button
        className={`join-item btn ${
          currentPage + 1 === data.totalPages ? "disabled" : ""
        }`}
        onClick={() => getAllContacts(currentPage + 1)}
        disabled={currentPage + 1 === data.totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
