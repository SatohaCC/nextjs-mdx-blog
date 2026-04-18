import { type TocItem } from '@/features/posts/api/toc-generator';

import {
  tocContainerStyles,
  tocHeadingStyles,
  tocItemRecipe,
  tocLinkRecipe,
  tocListStyles,
} from './TableOfContents.styles';

type TableOfContentsProps = {
  toc: TocItem[];
};

export const TableOfContents = ({ toc }: TableOfContentsProps) => {
  if (toc.length === 0) {
    return null;
  }

  return (
    <nav className={tocContainerStyles} aria-label="目次">
      <h2 className={tocHeadingStyles}>目次</h2>
      <ul className={tocListStyles}>
        {toc.map((item) => (
          <li key={item.id} className={tocItemRecipe({ level: item.level as 2 | 3 })}>
            <a href={`#${item.id}`} className={tocLinkRecipe({ level: item.level as 2 | 3 })}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
