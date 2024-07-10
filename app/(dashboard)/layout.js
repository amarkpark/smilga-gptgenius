import Sidebar from "@/components/Sidebar"
// import { IconName } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";

function DashLayout({ children }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="main-menu-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="main-menu-drawer"
          className="drawer-button lg:hidden fixed top-6 right-6"
          aria-label="open-sidebar"
        >
          <FiMenu className="w-8 h-8 text-primary" />
        </label>
        <div className="bg-base-200 px-8 py-12 min-h-screen">
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="main-menu-drawer"
          className="drawer-overlay"
          aria-label="close-sidebar"
        >
        </label>
        <Sidebar />
      </div>
    </div>
  )
}

export default DashLayout
