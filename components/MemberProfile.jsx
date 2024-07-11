// @refresh reset

import { UserButton } from "@clerk/nextjs"
import { auth, currentUser } from "@clerk/nextjs/server"

const MemberProfile = async () => {
  const user = await currentUser();
  const userEmail = user.emailAddresses[0].emailAddress;

  return (
    <div className="my-4 flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
      <span className="text-sm">
        {userEmail}
      </span>
    </div>
  )
}

export default MemberProfile