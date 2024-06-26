// import { Lato, Outfit, Space_Mono } from 'next/font/google';
import { Poppins } from 'next/font/google';

const mainFont = Poppins({
  weight: ['300', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

// const latoFont = Lato({
//   weight: ['100', '300', '400', '700', '900'],
//   subsets: ['latin'],
//   variable: '--font-lato',
// });
//
// const spaceMono = Space_Mono({
//   weight: ['400', '700'],
//   subsets: ['latin'],
//   variable: '--font-space-mono',
// });

const fonts = {
  default: mainFont,
  // spaceMono,
};

export default fonts;
