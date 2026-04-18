import { skipLinkStyles } from './styles';

/**
 * キーボードユーザーがナビゲーションをスキップしてメインコンテンツへ直接移動するためのリンク。
 * フォーカスを受け取るまで視覚的に非表示になる。
 *
 * @summary WCAG 2.4.1 準拠のスキップナビゲーションリンク
 */
export const SkipLink = () => {
  return (
    <a href="#main-content" className={skipLinkStyles}>
      メインコンテンツへスキップ
    </a>
  );
};
