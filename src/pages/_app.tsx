import { AppProps } from "next/app";

import "./normalize.css";
import "./style.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
