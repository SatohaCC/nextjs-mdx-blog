import { getAllTags, getSortedPostsData } from '@/features/posts/api/posts';

import { SidebarPresentational } from './SidebarPresentational';

export const SidebarContainer = async () => {
  const allTags = await getAllTags();
  const sortedPosts = await getSortedPostsData();
  const latestPosts = sortedPosts.slice(0, 5);

  return <SidebarPresentational allTags={allTags} latestPosts={latestPosts} />;
};
