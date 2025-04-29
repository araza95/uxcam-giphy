import { Pagination } from "../shared/Pagination";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationBar({ currentPage, totalPages }: PaginationBarProps) {
  return (
    <section className="sticky bottom-0 border-t border-border bg-sidebar p-4 flex justify-center">
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}