import { APL, FileAPL, SaleorCloudAPL, UpstashAPL } from "@saleor/app-sdk/APL";
import { SaleorApp } from "@saleor/app-sdk/saleor-app";

const aplType = process.env.APL ?? "file";

console.log("aplType", aplType);

let apl: APL;

switch (aplType) {
  case "upstash":
    // apl = new UpstashAPL();
    apl = new UpstashAPL({
      // Vercel
      restToken:
        "AXhdASQgYjhjNzAxZDEtMDAxNi00NTQ2LWE0ZTEtOGFjNGIzMWViMTIwZWExMjBjNjJkM2I2NDM1Y2EyMTlmMjM2YzAwNjg3ZGM=",
      restURL: "https://smooth-boar-30813.upstash.io",
    });

    break;
  case "file":
    apl = new FileAPL();

    break;
  case "rest": {
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

export const REQUIRED_SALEOR_VERSION = ">=3.10 <4";
