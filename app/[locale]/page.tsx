import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main style={{padding: '4rem', textAlign: 'center'}}>
      <h1>{t('hero_title')}</h1>
      <p>{t('hero_subtitle')}</p>
    </main>
  );
}