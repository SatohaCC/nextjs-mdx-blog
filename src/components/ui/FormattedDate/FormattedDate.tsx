import { useMemo } from 'react';

type FormattedDateProps = {
  /** ISO 8601形式の日付文字列（例: `2024-01-15`） */
  date: string;
  /** 追加のCSSクラス名 */
  className?: string;
};

/**
 * 日付をロケールに合わせてフォーマットして表示するコンポーネント。
 * セマンティックな <time> タグを使用します。
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
