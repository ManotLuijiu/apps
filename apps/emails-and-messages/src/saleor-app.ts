import { APL, FileAPL, SaleorCloudAPL, UpstashAPL } from "@saleor/app-sdk/APL";
import { SaleorApp } from "@saleor/app-sdk/saleor-app";

const aplType = process.env.APL ?? "file";

export let apl: APL;

switch (aplType) {
  case "upstash":
    apl = new UpstashAPL({
      // Vercel
      restToken:
        "AbqaASQgY2U4ODA4YzAtMzc5Yi00MmY0LWJlNTktMGJiZTRjZTg2YWU0Y2Q3YjJjMTc2OTM2NDEwMmFmZjA2NjdiMjQzMGJmMjk=",
      restURL: "https://communal-gator-47770.kv.vercel-storage.com",
    });

    break;
  case "file":
    apl = new FileAPL();

    break;
  case "saleor-cloud": {
    if (!process.env.REST_APL_ENDPOINT || !process.env.REST_APL_TOKEN) {
      throw new Error("Rest APL is not configured - missing env variables. Check saleor-app.ts");
    }

    apl = new SaleorCloudAPL({
      resourceUrl: process.env.REST_APL_ENDPOINT,
      token: process.env.REST_APL_TOKEN,
    });

    break;
  }
  default: {
    throw new Error("Invalid APL config, ");
  }
}
export const saleorApp = new SaleorApp({
  apl,
});

export const REQUIRED_SALEOR_VERSION = ">=3.11.7 <4";
