import Image from 'next/image';

import { darkWrapperStyles, iconImageStyles, lightWrapperStyles } from './styles';

/**
 * ライトモードとダークモードで自動的に色を切り替える GitHub アイコンコンポーネント。
 * Next.js の `Image` コンポーネントを使用し、各モードに応じた画像を表示します。
 * 主にヘッダーやソーシャルリンクで使用します。
 *
 * @summary GitHub のブランドアイコン（モード自動切り替え対応）
 */
export const GithubIcon = () => (
  <>
    <span className={lightWrapperStyles}>
      <Image src="/github-mark.png" alt="" width={20} height={20} className={iconImageStyles} />
    </span>
    <span className={darkWrapperStyles}>
      <Image
        src="/github-mark-white.png"
        alt=""
        width={20}
        height={20}
        className={iconImageStyles}
      />
    </span>
  </>
);
