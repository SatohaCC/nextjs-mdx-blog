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
    <nav aria-label="ページネーション" className={paginationNavStyles}>
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
        <a
          className={disabledStyles}
          role="link"
          aria-disabled="true"
          aria-label="前のページ（現在最初のページです）"
        >
          <ChevronLeft size={20} />
        </a>
      )}

      {/* Page Numbers */}
      <div className={pageNumbersStyles}>
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className={ellipsisStyles} role="img" aria-label="省略">
              <MoreHorizontal size={16} aria-hidden="true" />
            </span>
          ) : (
            <AppLink
              key={page}
              href={getPageUrl(page)}
              className={pageNumberRecipe({ active: currentPage === page })}
              aria-current={currentPage === page ? 'page' : undefined}
              aria-label={`ページ ${page}`}
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
        <a
          className={disabledStyles}
          role="link"
          aria-disabled="true"
          aria-label="次のページ（現在最後のページです）"
        >
          <ChevronRight size={20} />
        </a>
      )}
    </nav>
  );
};
