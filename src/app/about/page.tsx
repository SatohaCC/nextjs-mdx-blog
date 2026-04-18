import type { Metadata } from 'next';

import { AboutContainer as AboutComponent } from '@/features/about/components/About';

export const metadata: Metadata = {
  title: 'About',
};

const AboutPage = () => {
  return <AboutComponent />;
};

export default AboutPage;
