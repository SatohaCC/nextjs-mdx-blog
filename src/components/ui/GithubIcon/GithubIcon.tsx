import Image from 'next/image';

import { darkWrapperStyles, iconImageStyles, lightWrapperStyles } from './GithubIcon.styles';

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
