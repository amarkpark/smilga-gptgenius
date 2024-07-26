// @refresh reset
import SidebarHeader from "./SidebarHeader"
import NavLinks from "./NavLinks"
import MemberProfile from "./MemberProfile"
import TokensRemaining from "./TokensRemaining"

const Sidebar = () => {
  return (
    <div
      className=" px-4 w-80 min-h-full bg-base-300 py-10 grid grid-rows-[auto,auto,1fr,auto]"
    >
      <SidebarHeader />
      <MemberProfile />
      <NavLinks />
      <TokensRemaining />
    </div>
  )
}

export default Sidebar