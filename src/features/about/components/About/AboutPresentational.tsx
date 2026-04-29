import { MarkdownRenderer } from '@/components/mdx/MarkdownRenderer/MarkdownRenderer';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';

type AboutPresentationalProps = {
  title: string;
  content: string;
};

export const AboutPresentational = ({ title, content }: AboutPresentationalProps) => {
  return (
    <div>
      <PageTitle>{title}</PageTitle>
      <MarkdownRenderer content={content} />
    </div>
  );
};
