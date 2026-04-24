import { useMemo } from 'react';

type FormattedDateProps = {
  /** ISO 8601形式の日付文字列（例: `2024-01-15`） */
  date: string;
  /** 追加のCSSクラス名 */
  className?: string;
};

/**
 * 日付文字列を、ユーザーのロケール（デフォルトは ja-JP）に合わせてフォーマットして表示するコンポーネント。
 *
 * セマンティックな `<time>` タグを使用し、機械可読な `dateTime` 属性を付与することで
 * アクセシビリティと SEO（検索エンジンへの正確な日付情報の伝達）を向上させます。
 * 内部で `Intl.DateTimeFormat` を使用して、「2024年1月15日」のような形式に変換します。
 *
 * @summary 記事の投稿日や更新日を読みやすい形式で表示する
 */
export const FormattedDate = ({ date, className }: FormattedDateProps) => {
  const formattedDate = useMemo(() => {
    try {
      const d = new Date(date);
      return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(d);
    } catch {
      return date;
    }
  }, [date]);

  return (
    <time dateTime={date} className={className}>
      {formattedDate}
    </time>
  );
};
