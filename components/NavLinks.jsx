// @refresh reset
import Link from "next/link"

const links = [
  {href: "/chat", name: "Chat"},
  {href: "/tours", name: "Tours"},
  {href: "/tours/explore", name: "Explore"},
  {href: "/profile", name: "Profile"},
]

const NavLinks = () => {
  return (
    <ul className="menu bg-base-200 rounded-box w-56">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="capitalize">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavLinks