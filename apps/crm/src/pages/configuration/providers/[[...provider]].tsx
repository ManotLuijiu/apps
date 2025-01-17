import { NextPage } from "next";
import React, { useEffect } from "react";

import { AppColumnsLayout } from "../../../modules/ui/app-columns-layout/app-columns-layout";
import { ProvidersList } from "../../../modules/providers/providers-list/providers-list";
import { useRouter } from "next/router";
import {
  isValidProviderType,
  ProvidersTypes,
  ProviderType,
} from "../../../modules/providers/providers-types";
import { MailchimpConfigView } from "../../../modules/mailchimp/views/mailchimp-config-view/mailchimp-config-view";

const views = {
  mailchimp: MailchimpConfigView,
} satisfies Record<ProviderType, React.ComponentType>;

const ProvidersPage: NextPage = () => {
  const router = useRouter();
  const selectedProviderQuery = router.query.provider && router.query.provider[0];

  useEffect(() => {
    if (!isValidProviderType(selectedProviderQuery)) {
      router.push(`/configuration/providers/${ProvidersTypes.mailchimp}`);
    }
    // todo show 404?
  }, [selectedProviderQuery, router]);

  const selectedProvider = selectedProviderQuery as ProviderType;

  const ProviderView = views[selectedProvider] ?? (() => null);

  return (
    <div>
      <p>Connect Saleor clients database with your favorite CRM platform. Esthete</p>
      <AppColumnsLayout marginTop={9}>
        <ProvidersList
          onProviderClick={(provider) => {
            console.log("onProviderClicked");
            router.push(`/configuration/providers/${provider}`);
          }}
          activeProvider="mailchimp"
        />
        <ProviderView />
      </AppColumnsLayout>
    </div>
  );
};

export default ProvidersPage;
