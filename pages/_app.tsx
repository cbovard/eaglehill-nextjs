import { AppProps } from "next/app";
import { Bebas_Neue } from "next/font/google";

import "styles/globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas-neue",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-bebas-neue: ${bebasNeue.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
