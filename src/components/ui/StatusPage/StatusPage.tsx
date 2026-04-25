import { AppLink } from '@/components/ui/AppLink';
import { Button } from '@/components/ui/Button';

import {
  statusPageActionsStyles,
  statusPageDescStyles,
  statusPageLinkStyles,
  statusPageStatusStyles,
  statusPageTitleStyles,
  statusPageWrapperStyles,
} from './styles';

type StatusPageProps = {
  /** 表示するステータスコード（例: `"404"`, `"500"`） */
  status: string;
  /** エラータイトル */
  title: string;
  /** ユーザー向けの説明文 */
  description: string;
  /** 再試行ボタンのコールバック。渡さない場合はボタンが非表示になる */
  onReset?: () => void;
};

/**
 * エラーや Not Found 時に表示するフルページコンポーネント。
 * `onReset` を渡すと再試行ボタンが表示される。
 *
 * @summary エラーページや404ページのレイアウトに使用する
 */
export const StatusPage = ({ status, title, description, onReset }: StatusPageProps) => (
  <div className={statusPageWrapperStyles}>
    <p className={statusPageStatusStyles}>{status}</p>
    <h1 className={statusPageTitleStyles}>{title}</h1>
    <p className={statusPageDescStyles}>{description}</p>

    <div className={statusPageActionsStyles}>
      {onReset && (
        <Button variant="primary" size="sm" onPress={onReset}>
          再試行する
        </Button>
      )}
      <AppLink href="/" className={statusPageLinkStyles}>
        トップページへ戻る
      </AppLink>
    </div>
  </div>
);
