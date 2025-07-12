function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label = capitalizeFirst(decodeURIComponent(segment))
    return {
      label,
      href,
      isLast: index === segments.length - 1,
    }
  })

  return [{ label: "Home", href: "/", isLast: false }, ...breadcrumbs]
}