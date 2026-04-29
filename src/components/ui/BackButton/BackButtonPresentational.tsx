import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/Button/Button';

type BackButtonPresentationalProps = {
  /** 戻るボタンが押されたときのコールバック */
  onBack: () => void;
};

/**
 * 前のページに戻るためのゴーストボタン。
 * ナビゲーションロジックは BackButtonContainer が担う。
 *
 * @summary 前ページへの戻る操作に使用する
 */
export const BackButtonPresentational = ({ onBack }: BackButtonPresentationalProps) => {
  return (
    <Button variant="ghost" onPress={onBack}>
      <ArrowLeft size={18} />
      戻る
    </Button>
  );
};
