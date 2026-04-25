import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { cx } from '../../../../styled-system/css';
import * as styles from './Typography.styles';

/**
 * デザインシステムで定義されているタイポグラフィトークンのカタログです。
 * `panda.config.ts` で定義されたフォントサイズ、ウェイト、行高、字間、フォントファミリーを確認できます。
 */
const meta: Meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

const SampleText =
  'The quick brown fox jumps over the lazy dog. どんぐりころころ、どんぐりこ。漢字の練習。';

export const AllTokens: Story = {
  render: () => (
    <div className={styles.containerStyles}>
      <h1 className={styles.pageTitleStyles}>Typography Tokens</h1>

      <section>
        <h2 className={styles.sectionTitleStyles}>Headings (Semantic)</h2>
        <p className={cx(styles.bodyStyles.small, styles.labelStyles)}>
          レスポンシブ対応（画面幅に応じてサイズが変化します）
        </p>
        <div className={styles.itemStackStyles}>
          {(Object.keys(styles.headingStyles) as Array<keyof typeof styles.headingStyles>).map(
            (level) => (
              <div key={level} className={styles.rowStyles}>
                <span className={styles.labelStyles}>{`heading.${level}`}</span>
                <h1 className={styles.headingStyles[level]}>{SampleText}</h1>
              </div>
            )
          )}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitleStyles}>Body Text (Semantic)</h2>
        <div className={styles.itemStackStyles}>
          {(Object.keys(styles.bodyStyles) as Array<keyof typeof styles.bodyStyles>).map((size) => (
            <div key={size} className={styles.rowStyles}>
              <span className={styles.labelStyles}>{`body.${size}`}</span>
              <p className={styles.bodyStyles[size]}>{SampleText}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitleStyles}>Font Families</h2>
        <div className={styles.itemStackStyles}>
          {(
            Object.keys(styles.fontFamilyStyles) as Array<keyof typeof styles.fontFamilyStyles>
          ).map((family) => (
            <div key={family} className={styles.rowStyles}>
              <span className={styles.labelStyles}>{family}</span>
              <p className={styles.fontFamilyStyles[family]}>
                ABCDEFGHIJKLMN abcdefghijklmn 0123456789 あいうえお 漢字
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitleStyles}>Font Weights</h2>
        <div className={styles.weightStackStyles}>
          {(
            Object.keys(styles.fontWeightStyles) as Array<keyof typeof styles.fontWeightStyles>
          ).map((weight) => (
            <div key={weight} className={styles.rowStyles}>
              <span className={styles.labelStyles}>{weight}</span>
              <p className={styles.fontWeightStyles[weight]}>{SampleText}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitleStyles}>Letter Spacings</h2>
        <div className={styles.weightStackStyles}>
          {(
            Object.keys(styles.letterSpacingStyles) as Array<
              keyof typeof styles.letterSpacingStyles
            >
          ).map((spacing) => (
            <div key={spacing} className={styles.rowStyles}>
              <span className={styles.labelStyles}>{spacing}</span>
              <p className={styles.letterSpacingStyles[spacing]}>{SampleText}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
