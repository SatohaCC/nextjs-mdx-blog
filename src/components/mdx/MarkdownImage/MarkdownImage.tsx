import Image from 'next/image';

import { imageContainerStyles, imageStyles } from './styles';

type MarkdownImageProps = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
};

/**
 * MDX 内の画像を最適化して表示するためのコンポーネント。
 * 標準の `img` タグの代わりに `next/image` を使用します。
 * rehype-image-size プラグインによって付与された width/height を利用します。
 *
 * NOTE: ハイドレーションエラーを避けるため、figure ではなく span (display: block) を使用しています。
 */
export const MarkdownImage = ({ src, alt, width, height, priority }: MarkdownImageProps) => {
  if (!src) return null;

  // 外部画像や SVG などの場合は最適化をスキップ、または unoptimized を使用
  const isExternal = src.startsWith('http');
  const isSvg = src.endsWith('.svg');

  // width/height が数値として取得できているか確認
  const w = typeof width === 'string' ? parseInt(width, 10) : width;
  const h = typeof height === 'string' ? parseInt(height, 10) : height;

  const hasSize = !isNaN(w as number) && !isNaN(h as number);

  return (
    <span className={imageContainerStyles}>
      <Image
        src={src}
        alt={alt || ''}
        width={hasSize ? (w as number) : undefined}
        height={hasSize ? (h as number) : undefined}
        // サイズが不明な場合は fill を使うか、または unoptimized
        fill={!hasSize && !isExternal}
        unoptimized={isExternal || isSvg || !hasSize}
        className={imageStyles}
        sizes={hasSize ? undefined : '(max-width: 768px) 100vw, 800px'}
        priority={priority}
      />
      {/* {alt && <span className={captionStyles}>{alt}</span>} */}
    </span>
  );
};
