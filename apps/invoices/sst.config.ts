/* eslint-disable import/no-default-export */
import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "saleor-invoices",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        customDomain: {
          domainName:
            stack.stage === "prod"
              ? "saleor-invoices.iesthete.com"
              : `${stack.stage}.saleor-invoices.iesthete.com`,
          hostedZone: "iesthete.com",
        },
      });

      stack.addOutputs({
        SiteUrl: site.customDomainUrl || site.url,
      });
    });
  },
} satisfies SSTConfig;
