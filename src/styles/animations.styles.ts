import { css } from '../../styled-system/css';

export const HoverStyle = (): string =>
  css({
    position: 'relative',
    // isolation: 'isolate',

    _before: {
      content: '""',
      position: 'absolute',
      inset: 0,
      bg: 'takenoko.bamboo.400',
      opacity: 0,
      zIndex: 'hide',
      transformOrigin: 'center',
      transitionProperty: 'transform, opacity',
      transitionDuration: 'normal',
      transitionTimingFunction: 'spring',
      borderRadius: 'inherit',
      pointerEvents: 'none',
    },
    _hover: {
      _before: {
        opacity: 0.4,
        transform: 'rotate(-10deg) scale(1.05)',
      },
    },
  });
