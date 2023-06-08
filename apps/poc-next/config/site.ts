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
      href: "/submit-url",
    },
    {
      title: "Add tag",
      href: "/submit-tag",
    },
    {
      title: "Me",
      href: "/me",
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
    signUp: "/sign-up",
    account: "/account",
    discover: "/discover",
    submitUrl: "/submit-url",
    submitTag: "/submit-tag",
  },
}
