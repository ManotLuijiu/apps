import { createAppRegisterHandler } from "@saleor/app-sdk/handlers/next";

import { saleorApp } from "../../saleor-app";

const allowedUrlsPattern = process.env.ALLOWED_DOMAIN_PATTERN;

console.log("allowedUrlsPattern", allowedUrlsPattern);

/**
 * Required endpoint, called by Saleor to install app.
 * It will exchange tokens with app, so saleorApp.apl will contain token
 */
export default createAppRegisterHandler({
  apl: saleorApp.apl,
  allowedSaleorUrls: [
    (url) => {
      if (allowedUrlsPattern) {
        const regex = new RegExp(allowedUrlsPattern);

        return regex.test(url);
      }

      return true;
    },
  ],
});
