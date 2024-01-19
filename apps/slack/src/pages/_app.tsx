import { AppBridge, AppBridgeProvider } from "@saleor/app-sdk/app-bridge";
import { NoSSRWrapper } from "@saleor/apps-shared";
import { ThemeProvider } from "@saleor/macaw-ui";
import "@saleor/macaw-ui/style";
import { AppProps } from "next/app";
import { ThemeSynchronizer } from "../hooks/theme-synchronizer";

const appBridge = new AppBridge({
  saleorApiUrl: "https://saleor-api.iesthete.com/graphql/",
});

const { token, saleorApiUrl, ready, id } = appBridge.getState();

console.log("token", token);
console.log("saleorApiUrl", saleorApiUrl);
console.log("ready", ready);
console.log("id", id);

/**
 * Ensure instance is a singleton.
 */
export const appBridgeInstance =
  typeof window !== "undefined"
    ? new AppBridge({
        saleorApiUrl: "https://saleor-api.iesthete.com/graphql/",
      })
    : undefined;

function SaleorApp({ Component, pageProps }: AppProps) {
  // @ts-ignore todo refactor
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <NoSSRWrapper>
      <AppBridgeProvider appBridgeInstance={appBridgeInstance}>
        <ThemeProvider>
          <ThemeSynchronizer />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </AppBridgeProvider>
    </NoSSRWrapper>
  );
}

export default SaleorApp;
