import "@saleor/macaw-ui/style";
import "../styles/globals.css";

import { AppBridge, AppBridgeProvider } from "@saleor/app-sdk/app-bridge";
import { RoutePropagator } from "@saleor/app-sdk/app-bridge/next";
import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@saleor/macaw-ui";

import { ThemeSynchronizer } from "../lib/theme-synchronizer";
import { NoSSRWrapper } from "../lib/no-ssr-wrapper";
import { trpcClient } from "../modules/trpc/trpc-client";

/**
 * Ensure instance is a singleton.
 * TODO: This is React 18 issue, consider hiding this workaround inside app-sdk
 */
export const appBridgeInstance =
  typeof window !== "undefined"
    ? new AppBridge({
        saleorApiUrl: "https://saleor-api.iesthete.com/graphql/",
      })
    : undefined;

console.log("appBridgeInstance_email_app.tsx", appBridgeInstance);
function NextApp({ Component, pageProps }: AppProps) {
  return (
    <NoSSRWrapper>
      <AppBridgeProvider appBridgeInstance={appBridgeInstance}>
        <ThemeProvider defaultTheme="defaultLight">
          <ThemeSynchronizer />
          <RoutePropagator />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppBridgeProvider>
    </NoSSRWrapper>
  );
}

export default trpcClient.withTRPC(NextApp);
