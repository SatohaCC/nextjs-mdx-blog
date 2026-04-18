'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { BackButtonPresentational } from './BackButtonPresentational';

export const BackButtonContainer = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return <BackButtonPresentational onBack={handleBack} />;
};
