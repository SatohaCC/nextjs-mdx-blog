import { css } from '../../../../styled-system/css';
import { tag } from '../../../../styled-system/recipes';

export { tag as tagRecipe };
export type { TagVariantProps } from '../../../../styled-system/recipes';

// Tag List Styles はコンテナなのでパターンのような扱いとして css() のまま残すか、
// またはここで定義する
export const tagListStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
});
