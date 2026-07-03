import VideoIntro from '@/components/VideoIntro/VideoIntro';
import ScrollChapters from '@/components/ScrollChapters/ScrollChapters';
import SiteFooter from '@/components/SiteFooter/SiteFooter';

export default function Home() {
  return (
    <main>
      <VideoIntro />
      <ScrollChapters />
      <SiteFooter />
    </main>
  );
}
