export type NavItem = { title: string; href: string; soon?: boolean };
export type NavGroup = { title: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    title: "Foundations",
    items: [
      { title: "Philosophy", href: "/foundations/philosophy" },
      { title: "Colour", href: "/foundations/colour" },
      { title: "Typography", href: "/foundations/typography" },
      { title: "Spacing & Layout", href: "/foundations/spacing" },
      { title: "Shape & Effects", href: "/foundations/shape" },
      { title: "Motion", href: "/foundations/motion" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Buttons", href: "/components/buttons" },
      { title: "Inputs", href: "/components/inputs" },
      { title: "Cards", href: "/components/cards", soon: true },
      { title: "Icons", href: "/components/icons" },
    ],
  },
];
