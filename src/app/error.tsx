'use client';

import { StatusPage } from '@/components/ui/StatusPage/StatusPage';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ reset }: ErrorPageProps) => (
  <StatusPage
    status="500"
    title="エラーが発生しました"
    description="予期しないエラーが発生しました。しばらく時間をおいて再度お試しください。"
    onReset={reset}
  />
);

export default ErrorPage;
