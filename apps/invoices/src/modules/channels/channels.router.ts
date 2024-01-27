import { router } from "../trpc/trpc-server";
import { protectedClientProcedure } from "../trpc/protected-client-procedure";
import { ChannelsFetcher } from "./channels-fetcher";
import { ChannelFragment } from "../../../generated/graphql";
import { createGraphQLClient } from "@saleor/apps-shared";

export const channelsRouter = router({
  fetch: protectedClientProcedure.query(async ({ ctx, input }): Promise<ChannelFragment[]> => {
    console.log("channels.router_ctx", ctx);
    const client = createGraphQLClient({
      saleorApiUrl: ctx.saleorApiUrl,
      token: ctx.token,
    });

    const fetcher = new ChannelsFetcher(client);

    return fetcher.fetchChannels().then((channels) => channels ?? []);
  }),
});
