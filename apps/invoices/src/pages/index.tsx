import { NextPage } from "next";
import { useAppBridge } from "@saleor/app-sdk/app-bridge";
import { useEffect } from "react";
import { useIsMounted } from "usehooks-ts";
import { useRouter } from "next/router";
import { isInIframe } from "@saleor/apps-shared";
import { Box, Text } from "@saleor/macaw-ui";

const IndexPage: NextPage = () => {
  const { appBridgeState } = useAppBridge();

  console.log("appBridgeState", appBridgeState);

  const isMounted = useIsMounted();

  console.log("isMounted", isMounted);

  const { replace } = useRouter();

  useEffect(() => {
    if (isMounted() && appBridgeState?.ready) {
      replace("/configuration");
    }
  }, [isMounted, appBridgeState?.ready, replace]);

  if (isInIframe()) {
    return null;
  }

  return (
    <Box>
      <Text as={"h1"} variant={"hero"}>
        Saleor Invoices
      </Text>
      <Text as={"p"}>This is Saleor App that allows invoices generation</Text>
      <Text as={"p"}>
        Install app in your Saleor instance and open in with Dashboard{" "}
        <a href={"https://github.com/saleor/apps"}>or check it on Github</a>
      </Text>
    </Box>
  );
};

export default IndexPage;
