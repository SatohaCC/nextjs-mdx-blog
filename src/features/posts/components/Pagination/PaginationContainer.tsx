import { PaginationPresentational } from './PaginationPresentational';

type PaginationContainerProps = {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  getPageUrl?: (page: number) => string;
};

const generatePagination = (currentPage: number, totalPages: number): (number | 'ellipsis')[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];
  pages.push(1);

  if (currentPage <= 3) {
    pages.push(2, 3, 4, 'ellipsis', totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push('ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push('ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
  }

  return pages;
};

const getPageUrl = (page: number, baseUrl?: string): string => {
  if (baseUrl) {
    return page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
  }
  return page === 1 ? '/' : `/page/${page}`;
};

export const PaginationContainer = ({
  currentPage,
  totalPages,
  baseUrl,
  getPageUrl: getPageUrlProp,
}: PaginationContainerProps) => {
  const pages = generatePagination(currentPage, totalPages);

  return (
    <PaginationPresentational
      currentPage={currentPage}
      totalPages={totalPages}
      pages={pages}
      getPageUrl={getPageUrlProp ?? ((page) => getPageUrl(page, baseUrl))}
    />
  );
};
