import PlausibleProvider from "next-plausible";
import { AppProps } from "next/app";

import "./normalize.css";
import "./style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<PlausibleProvider domain={process.env.NEXT_PLAUSIBLE_DOMAIN}>
    <Component {...pageProps} />
  </PlausibleProvider>)
}
