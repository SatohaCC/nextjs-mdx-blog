import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

import { skeletonCardStyles, skeletonListStyles } from './SearchSkeleton.styles';

export const SearchSkeleton = () => (
  <div className={skeletonListStyles}>
    {Array.from({ length: 3 }).map((_, i) => (
      <Skeleton key={i} className={skeletonCardStyles} />
    ))}
  </div>
);
