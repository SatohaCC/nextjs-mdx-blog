import { cx } from '../../../../styled-system/css';
import { skeletonStyles } from './styles';

type SkeletonProps = {
  /** 幅・高さなどを上書きするCSSクラス名 */
  className?: string;
};

/**
 * コンテンツ読み込み中に表示するプレースホルダー。
 * `aria-hidden` でスクリーンリーダーから隠される。
 *
 * @summary データフェッチ中のローディング表示に使用する
 */
export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cx(skeletonStyles, className)} aria-hidden="true" />
);
