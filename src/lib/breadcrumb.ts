function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Custom labels for better UX
const customLabels: Record<string, string> = {
  dashboard: "Dashboard",
  tickets: "Tickets",
  filter: "Filters",
  customers: "Customers",
  agents: "Agents",
  inbox: "Inbox",
  settings: "Settings",
  organizations: "Organizations",
  contacts: "Contacts",
  teams: "Teams",
  all: "All Tickets",
  my: "My Tickets",
  assigned: "Assigned to Me",
  closed: "Closed Tickets",
  archive: "Archive",
  status: "By Status",
  priority: "By Priority",
  tag: "By Tag",
  sla: "By SLA",
  profile: "Profile",
  appearance: "Appearance",
  notifications: "Notifications",
};

export function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const decodedSegment = decodeURIComponent(segment)
    const label = customLabels[decodedSegment.toLowerCase()] || capitalizeFirst(decodedSegment)
    
    return {
      label,
      href,
      isLast: index === segments.length - 1,
      segment: decodedSegment.toLowerCase(),
    }
  })

  return [{ label: "Home", href: "/", isLast: false, segment: "home" }, ...breadcrumbs]
}