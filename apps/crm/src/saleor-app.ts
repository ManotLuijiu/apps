import { APL, FileAPL, SaleorCloudAPL, UpstashAPL } from "@saleor/app-sdk/APL";
import { SaleorApp } from "@saleor/app-sdk/saleor-app";

const aplType = process.env.APL ?? "file";

console.log("aplType", aplType);

export let apl: APL;

switch (aplType) {
  case "upstash":
    console.log("upstash selected");
    // apl = new UpstashAPL();
    apl = new UpstashAPL({
      // upstash admin@iesthete.com
      restToken:
        "AYcuASQgYzRjNWM3NjUtODY5Ni00YmZmLWJkNWUtMWNlMDM4MzMyODRiMmI0MDM0NDVlN2EyNDUwNmFiZDZiOTlmM2RhN2Y3NTg=",
      restURL: "https://apn1-set-opossum-34606.upstash.io",
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
