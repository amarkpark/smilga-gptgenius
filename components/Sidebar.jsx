// @refresh reset
import SidebarHeader from "./SidebarHeader"
import NavLinks from "./NavLinks"
import MemberProfile from "./MemberProfile"

const Sidebar = () => {
  return (
    <div
      className=" px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto]"
    >
      <SidebarHeader />
      <NavLinks />
      <MemberProfile />
    </div>
  )
}

export default Sidebar