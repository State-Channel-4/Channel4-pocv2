export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Channel 4",
  description:
    "Experience random, interesting content from all over the internet.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Add site",
      href: "/sites/new",
    },
    {
      title: "Add tag",
      href: "/tags/new",
    },
  ],
  secondaryNav: [
    {
      title: "Sign in",
      href: "/sign-in",
    },
    {
      title: "Sign up",
      href: "/sign-up",
    },
  ],
  links: {
    twitter: "https://twitter.com/PrivacyScaling",
    github: "https://github.com/State-Channel-4/Channel4-pocv2",
    docs: "https://github.com/State-Channel-4/Channel4-pocv2",
    home: "/",
    account: "/account",
    discover: "/discover",
    submitUrl: "/submit-url",
    submitTag: "/submit-tag",
  },
}
