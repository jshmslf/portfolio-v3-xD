export const profile = {
  name: "Joshua Verceles",
  address: "Bayambang, Pangasinan, PH",
  email: "jshmslf@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/yourhandle", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", icon: "linkedin" },
    { label: "X", href: "https://x.com/yourhandle", icon: "x" },
  ],
} as const;

export type Profile = typeof profile;
export type SocialLink = (typeof profile)["social"][number];
