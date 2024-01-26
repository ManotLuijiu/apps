import { NextPage } from "next";
import React, { useEffect } from "react";
import { useAppBridge } from "@saleor/app-sdk/app-bridge";

import { useRouter } from "next/router";

const IndexPage: NextPage = () => {
  const { appBridgeState, appBridge } = useAppBridge();

  console.log("appBridgeState_index", appBridgeState);
  console.log("appBridgeState_index_ready", appBridgeState?.ready);
  console.log("appBridge_index", appBridge);
  const { replace } = useRouter();

  useEffect(() => {
    if (appBridgeState?.ready) {
      replace("/configuration/providers/mailchimp");
    }
  }, [appBridgeState, appBridge, replace]);

  return <p>Loading...</p>;
};

export default IndexPage;
