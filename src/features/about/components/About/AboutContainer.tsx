import { getMarkdownDataByPath } from '@/features/about/api/about';

import { AboutPresentational } from './AboutPresentational';

export const AboutContainer = async () => {
  const aboutData = await getMarkdownDataByPath('about.md');

  if (!aboutData) {
    return <div>Content not found.</div>;
  }

  return <AboutPresentational title={aboutData.frontmatter.title} content={aboutData.content} />;
};
