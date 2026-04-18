import { StatusPage } from '@/components/ui/StatusPage/StatusPage';

const NotFound = () => (
  <StatusPage
    status="404"
    title="ページが見つかりません"
    description="お探しのページは存在しないか、移動した可能性があります。"
  />
);

export default NotFound;
