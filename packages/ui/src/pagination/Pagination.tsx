import * as React from 'react';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '../utils/cn';
import './pagination.css';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  disabled?: boolean;
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  firstLabel?: string;
  lastLabel?: string;
}

type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

function createItems(page: number, pageCount: number, siblingCount: number): PaginationItem[] {
  if (pageCount <= 1) return [1];
  const visible = siblingCount * 2 + 5;
  if (pageCount <= visible) return Array.from({ length: pageCount }, (_, index) => index + 1);

  const start = Math.max(2, page - siblingCount);
  const end = Math.min(pageCount - 1, page + siblingCount);
  const items: PaginationItem[] = [1];

  if (start > 2) items.push('ellipsis-start');
  for (let value = start; value <= end; value += 1) items.push(value);
  if (end < pageCount - 1) items.push('ellipsis-end');
  items.push(pageCount);

  return items;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  disabled = false,
  label = 'Pagination',
  previousLabel = 'Page précédente',
  nextLabel = 'Page suivante',
  firstLabel = 'Première page',
  lastLabel = 'Dernière page',
  className,
  ...props
}: PaginationProps) {
  const safePageCount = Math.max(1, pageCount);
  const currentPage = Math.min(Math.max(1, page), safePageCount);
  const items = React.useMemo(
    () => createItems(currentPage, safePageCount, Math.max(0, siblingCount)),
    [currentPage, safePageCount, siblingCount],
  );

  const goTo = (target: number) => {
    if (disabled || target === currentPage || target < 1 || target > safePageCount) return;
    onPageChange(target);
  };

  const control = (
    icon: React.ReactNode,
    target: number,
    ariaLabel: string,
    isDisabled: boolean,
    key: string,
  ) => (
    <button
      key={key}
      type="button"
      className="fp-pagination__button fp-pagination__button--icon"
      onClick={() => goTo(target)}
      disabled={disabled || isDisabled}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );

  return (
    <nav className={cn('fp-pagination', className)} aria-label={label} {...props}>
      <div className="fp-pagination__list">
        {showFirstLast
          ? control(<ChevronsLeft aria-hidden="true" />, 1, firstLabel, currentPage === 1, 'first')
          : null}
        {control(<ChevronLeft aria-hidden="true" />, currentPage - 1, previousLabel, currentPage === 1, 'previous')}

        {items.map((item) =>
          typeof item === 'number' ? (
            <button
              key={item}
              type="button"
              className="fp-pagination__button"
              data-active={item === currentPage ? 'true' : undefined}
              aria-current={item === currentPage ? 'page' : undefined}
              aria-label={`Page ${item}`}
              disabled={disabled}
              onClick={() => goTo(item)}
            >
              {item}
            </button>
          ) : (
            <span key={item} className="fp-pagination__ellipsis" aria-hidden="true">
              <MoreHorizontal />
            </span>
          ),
        )}

        {control(<ChevronRight aria-hidden="true" />, currentPage + 1, nextLabel, currentPage === safePageCount, 'next')}
        {showFirstLast
          ? control(<ChevronsRight aria-hidden="true" />, safePageCount, lastLabel, currentPage === safePageCount, 'last')
          : null}
      </div>
    </nav>
  );
}
