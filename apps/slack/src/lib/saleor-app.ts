import { APL, FileAPL, SaleorCloudAPL, UpstashAPL } from "@saleor/app-sdk/APL";
import { SaleorApp } from "@saleor/app-sdk/saleor-app";

/**
 * By default, auth data are stored in the `.auth-data.json` (FileAPL).
 * For multi-tenant applications and deployments please use UpstashAPL.
 *
 * To read more about storing auth data, read the
 * [APL documentation](https://github.com/saleor/saleor-app-sdk/blob/main/docs/apl.md)
 */

let apl: APL;

console.log("process.env.APL", process.env.APL);
console.log("process.env.UPSTASH_URL", process.env.UPSTASH_URL);
console.log("process.env.UPSTASH_TOKEN", process.env.UPSTASH_TOKEN);

switch (process.env.APL) {
  case "upstash":
    /*
     * Require `UPSTASH_URL` and `UPSTASH_TOKEN` environment variables
     * Using Github login to upstash
     */
    apl = new UpstashAPL({
      // restToken: process.env.UPSTASH_TOKEN as string,
      restToken:
        "AYtlASQgZWU5Yzk3ZmQtOGE5My00ZDU3LTkxZGItNmI1MTIzNDJiNWFhYmFlYmYzYWEzMGJmNGQyOGEwZDdmZDlkZWIzOGI1ZmM=",
      /*
       * restURL: process.env.UPSTASH_URL as string,
       * restURL: "https://fancy-gopher-35685.upstash.io",
       */
      restURL: "https://fancy-gopher-35685.upstash.io",
    });
    break;
  case "saleor-cloud": {
    if (!process.env.REST_APL_ENDPOINT || !process.env.REST_APL_TOKEN) {
      throw new Error("Rest APL is not configured - missing env variables. Check saleor-app.ts");
    }

    apl = new SaleorCloudAPL({
      resourceUrl: process.env.REST_APL_ENDPOINT as string,
      token: process.env.REST_APL_TOKEN as string,
    });
    break;
  }
  default:
    apl = new FileAPL();
}

/*
 * TODO: Investigate why no-ssr-wrapper does not prevent this code from execution during the build time
 * if (!process.env.SECRET_KEY && process.env.NODE_ENV === "production") {
 *   throw new Error(
 *     "For production deployment SECRET_KEY is mandatory to use EncryptedSettingsManager."
 *   );
 * }
 */

// Use placeholder value for the development
export const settingsManagerSecretKey = process.env.SECRET_KEY || "CHANGE_ME";

console.log("process.env.SECRET_KEY", process.env.SECRET_KEY);

/**
 * Prohibit installation from Saleors other than specified by the regex.
 * Regex source is ENV so if ENV is not set, all installations will be allowed.
 */
export const allowedUrlsPattern = process.env.ALLOWED_DOMAIN_PATTERN;

export const saleorApp = new SaleorApp({
  apl,
});
