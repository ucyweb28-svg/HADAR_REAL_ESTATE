import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const trap = localFont({
  src: [
    {
      path: './Trap-Bold.otf',
      weight: '700',
    },
    {
      path: './Trap-Black.otf',
      weight: '900',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
});
