import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { AppLink } from '@/components/ui/AppLink';

import {
  disabledStyles,
  ellipsisStyles,
  mobileIndicatorStyles,
  pageNumberRecipe,
  pageNumbersStyles,
  paginationLinkStyles,
  paginationNavStyles,
} from './PaginationPresentational.styles';

type PaginationPresentationalProps = {
  currentPage: number;
  totalPages: number;
  pages: (number | 'ellipsis')[];
  getPageUrl: (page: number) => string;
};

export const PaginationPresentational = ({
  currentPage,
  totalPages,
  pages,
  getPageUrl,
}: PaginationPresentationalProps) => {
  return (
    <nav aria-label="Pagination" className={paginationNavStyles}>
      {/* Previous Button */}
      {currentPage > 1 ? (
        <AppLink
          href={getPageUrl(currentPage - 1)}
          className={paginationLinkStyles}
          aria-label="前のページ"
        >
          <ChevronLeft size={20} />
        </AppLink>
      ) : (
        <span className={disabledStyles} aria-hidden="true">
          <ChevronLeft size={20} />
        </span>
      )}

      {/* Page Numbers */}
      <div className={pageNumbersStyles}>
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className={ellipsisStyles} aria-hidden="true">
              <MoreHorizontal size={16} />
            </span>
          ) : (
            <AppLink
              key={page}
              href={getPageUrl(page)}
              className={pageNumberRecipe({ active: currentPage === page })}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </AppLink>
          )
        )}
      </div>

      {/* Mobile Page Indicator */}
      <div className={mobileIndicatorStyles}>
        {currentPage} / {totalPages}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <AppLink
          href={getPageUrl(currentPage + 1)}
          className={paginationLinkStyles}
          aria-label="次のページ"
        >
          <ChevronRight size={20} />
        </AppLink>
      ) : (
        <span className={disabledStyles} aria-hidden="true">
          <ChevronRight size={20} />
        </span>
      )}
    </nav>
  );
};
