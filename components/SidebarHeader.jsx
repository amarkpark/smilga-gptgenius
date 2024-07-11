// @refresh reset
import { LuBrainCircuit } from "react-icons/lu";
import ThemeToggle from "./ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="text-xl font-bold flex items-center place-content-between">
      <span className="flex items-center gap-2">
        <LuBrainCircuit className="size-6" />
        <span className="ml-2">GPTGenus</span>
      </span>
      <ThemeToggle />
    </div>
  )
}

export default SidebarHeader