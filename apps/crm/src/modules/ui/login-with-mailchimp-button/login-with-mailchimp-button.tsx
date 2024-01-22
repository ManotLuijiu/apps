import MailchimpLogo from "../../../assets/mailchimp.svg";
import { Button, ButtonProps } from "@saleor/macaw-ui";
import Image from "next/image";

export const LoginWithMailchimpButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="secondary"
      icon={<Image alt="Mailchimp Logo" width={25} height={25} src={MailchimpLogo.src} />}
      size="large"
      {...props}
    >
      Log in with Mailchimp
    </Button>
  );
};
