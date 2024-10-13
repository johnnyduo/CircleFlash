import { FontProvider } from "@/providers/FontProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import { TurboEdgeProviderV0 } from "@turbo-ing/edge-v0"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CircleFlash</title>
        <meta name="description" content="Lightning-Fast International Transfers, Powered by Circle" />
      </Head>
      <GoogleOAuthProvider clientId="463130711943-u9mcuoufo5kpiaon3uhskd1bd4h3dje7.apps.googleusercontent.com">
        <TurboEdgeProviderV0>
          <FontProvider>
            <ToastProvider>
              <Component {...pageProps} />
            </ToastProvider>
          </FontProvider>
        </TurboEdgeProviderV0>
      </GoogleOAuthProvider>
    </>
  );
}
