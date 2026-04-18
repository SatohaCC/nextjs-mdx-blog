import React, { type ReactElement, type ReactNode } from 'react';

import {
  AlertCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  type LucideIcon,
  ShieldAlert,
} from 'lucide-react';

import {
  type AlertType,
  alertContainerRecipe,
  alertContentStyles,
  alertHeaderStyles,
} from './MarkdownBlockquote.styles';

// AlertType は MarkdownBlockquote.styles からインポート

interface AlertConfig {
  label: string;
  icon: LucideIcon;
  colorToken: AlertType;
}

const ALERT_CONFIG: Record<string, AlertConfig> = {
  note: {
    label: 'Note',
    icon: Info,
    colorToken: 'note',
  },
  tip: {
    label: 'Tip',
    icon: Lightbulb,
    colorToken: 'tip',
  },
  important: {
    label: 'Important',
    icon: AlertCircle,
    colorToken: 'important',
  },
  warning: {
    label: 'Warning',
    icon: AlertTriangle,
    colorToken: 'warning',
  },
  caution: {
    label: 'Caution',
    icon: ShieldAlert,
    colorToken: 'caution',
  },
};

interface MDXElementProps {
  children?: ReactNode;
}

export const MarkdownBlockquote = ({ children }: { children: ReactNode }) => {
  let detectedType: AlertType | null = null;
  let markerIndex = -1;

  // 1. マーカー [!TYPE] を検出する
  // blockquote 直下の p 要素の children を走査する
  const childrenArray = React.Children.toArray(children);

  for (let i = 0; i < childrenArray.length; i++) {
    const child = childrenArray[i];
    if (React.isValidElement<MDXElementProps>(child) && child.type === 'p') {
      const pChildren = React.Children.toArray(child.props.children);
      const firstChild = pChildren[0];

      if (typeof firstChild === 'string') {
        const m = firstChild.trim().match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
        if (m) {
          detectedType = m[1].toLowerCase() as AlertType;
          markerIndex = i;
          break;
        }
      }
    }
  }

  // マーカーがない場合は通常の引用として返す
  if (!detectedType) {
    return <blockquote data-custom-blockquote="false">{children}</blockquote>;
  }

  const alertType = detectedType as AlertType;
  const config = ALERT_CONFIG[alertType];

  // 2. マーカーを除去したChildrenを再構成する
  const modifiedChildren = React.Children.map(children, (child, idx) => {
    if (idx === markerIndex && React.isValidElement<MDXElementProps>(child) && child.type === 'p') {
      const pChildren = React.Children.toArray(child.props.children);
      const first = pChildren[0];

      if (typeof first === 'string') {
        const textWithoutMarker = first.replace(
          /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i,
          ''
        );
        return React.cloneElement(child as ReactElement<MDXElementProps>, {
          children: [textWithoutMarker, ...pChildren.slice(1)],
        });
      }
    }
    return child;
  });

  const Icon = config.icon;

  return (
    <div
      className={alertContainerRecipe({ type: alertType })}
      data-custom-blockquote="true"
      data-alert-type={alertType}
    >
      <div className={alertHeaderStyles}>
        <Icon size={18} />
        <span>{config.label}</span>
      </div>
      <div className={alertContentStyles}>{modifiedChildren}</div>
    </div>
  );
};
