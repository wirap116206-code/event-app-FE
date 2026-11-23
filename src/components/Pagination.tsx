import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPage: number;
  onPage: (page: number) => void;
}

const Pagination = ({ page, totalPage, onPage }: Props) => {
  if (totalPage <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPage }, (_, i) => {
        const pageNumber = i + 1;

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPage(pageNumber)}
            aria-current={page === pageNumber ? "page" : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
              page === pageNumber
                ? "border border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "border border-slate-200 bg-white text-slate-600 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        disabled={page >= totalPage}
        onClick={() => onPage(page + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
