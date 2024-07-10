// @refresh reset
import { LuBrainCircuit } from "react-icons/lu";
import ThemeToggle from "./ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="text-lg flex items-center place-content-between">
      <span className="flex items-center gap-2">
        <LuBrainCircuit />
        <span className="ml-2">GPTGenus</span>
      </span>
      Eff me
      <ThemeToggle />
    </div>
  )
}

export default SidebarHeader