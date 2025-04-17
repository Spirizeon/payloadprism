import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "@/components/ui/footer";
import LaunchUI from "@/components/logos/launch-ui";
import { ReactNode } from "react";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
}

export default function FooterSection({
  logo = <LaunchUI />,
  name = "PayloadPrism",
  columns = [
    {
      title: "Product",
      links: [
        {
          text: "Changelog",
          href: "https://github.com/spirizeon/payloadprism",
        },
        {
          text: "Documentation",
          href: "https://github.com/spirizieon/payloadprism/README.md",
        },
      ],
    },
    {
      title: "Next Tech Lab",
      links: [
        { text: "About", href: "https://srmap.edu.in/next_tech_lab/" },
        { text: "Blog", href: "https://#" },
      ],
    },
    {
      title: "Contact",
      links: [
        {
          text: "Linkedin",
          href: "https://www.linkedin.com/company/next-tech-lab-ap/",
        },
        { text: "Facebook", href: "https://www.facebook.com/NextTechLabAP/" },
        { text: "Github", href: "https://github.com/nexttechlabap/" },
      ],
    },
  ],
  copyright = "© 2025 Next Tech Lab AP. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "https://#/" },
    { text: "Terms of Service", href: "https://#/" },
  ],
  showModeToggle = true,
}: FooterProps) {
  return (
    <footer className="bg-background w-full px-4">
      <div className="max-w-container mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                {logo}
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
