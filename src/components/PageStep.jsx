import { useBookData } from "../context/DataContect";

const Pagination = () => {
  const { currentPage, setCurrentPage } = useBookData();

  const pageNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="w-1/12">
        <button
          onClick={() => setCurrentPage(0)}
          className={`px-2 py-1 hover:bg-green-600 ${
            currentPage === 0 ? "bg-blue-500" : "bg-green-500"
          } text-white text-sm rounded font-semibold`}
        >
          Front Cover
        </button>
      </div>
      <div className="w-8/12">
        <div className="flex items-center justify-between">
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev - 1 >= 1 ? prev - 1 : prev))
            }
            className="px-3 py-1 hover:bg-green-600 bg-green-500 text-white text-sm rounded font-semibold"
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 hover:bg-green-600 ${
                currentPage === number ? "bg-blue-500" : "bg-green-500"
              } text-white text-sm rounded font-semibold`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev + 1 <= 10 ? prev + 1 : prev))
            }
            className="px-3 py-1 hover:bg-green-600 bg-green-500 text-white text-sm rounded font-semibold"
          >
            Next
          </button>
        </div>
      </div>
      <div className="w-1/12 justify-self-end">
        <button
          onClick={() => setCurrentPage(11)}
          className={`px-2 py-1 hover:bg-green-600 ${
            currentPage === 11 ? "bg-blue-500" : "bg-green-500"
          } text-white text-sm rounded font-semibold`}
        >
          Back Cover
        </button>
      </div>
    </div>
  );
};

export default Pagination;
