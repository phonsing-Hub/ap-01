import * as Icon from "lucide-react";

export const menuData = {
  teams: [
    {
      name: "Project Phoenix",
      logo: Icon.Flame,
      plan: "Business",
    },
    {
      name: "Marketing Campaign",
      logo: Icon.Megaphone,
      plan: "Business",
    },
    {
      name: "Personal Tasks",
      logo: Icon.User,
      plan: "Free",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Icon.LayoutDashboard,
      asChild: false,
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: Icon.Inbox,
      asChild: false,
    },
    {
      title: "Tickets",
      url: "#",
      icon: Icon.SquareDashedKanban,
      asChild: true,
      isActive: true,
      items: [
        { title: "All Tickets", url: "/tickets/all" },
        { title: "My Tickets", url: "/tickets/my" },
        { title: "Assigned to Me", url: "/tickets/assigned" },
        { title: "Closed Tickets", url: "/tickets/closed" },
        { title: "Trash / Archive", url: "/tickets/archive" },
      ],
    },
    {
      title: "Filters",
      url: "#",
      icon: Icon.Filter,
      asChild: true,
      items: [
        { title: "By Status", url: "/tickets/filter/status" },
        { title: "By Priority", url: "/tickets/filter/priority" },
        { title: "By Tag", url: "/tickets/filter/tag" },
        { title: "By SLA", url: "/tickets/filter/sla" },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: Icon.Users,
      asChild: true,
      items: [
        { title: "Organizations", url: "/customers/organizations" },
        { title: "Contacts", url: "/customers/contacts" },
      ],
    },
    {
      title: "Agents",
      url: "#",
      icon: Icon.UserCog,
      asChild: true,
      items: [
        { title: "All Agents", url: "/agents" },
        { title: "Teams / Departments", url: "/agents/teams" },
      ],
    },
  ],

  navFooter: [
    {
      title: "Settings",
      url: "#",
      icon: Icon.Settings,
      asChild: true,
      items: [
        { title: "Ticket Settings", url: "/settings/tickets" },
        { title: "Automation Rules", url: "/settings/automation" },
        { title: "SLA Policies", url: "/settings/sla" },
        { title: "Tags / Categories", url: "/settings/tags" },
        { title: "Email Templates", url: "/settings/email" },
      ],
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Icon.Bell,
      asChild: false,
    },
    {
      title: "Help & Support",
      url: "/help",
      icon: Icon.HelpCircle,
      asChild: false,
    },
  ],
};
