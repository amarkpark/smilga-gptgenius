// @refresh reset

import { fetchOrInitializeTokens } from "@/utils/action";
import { UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

const MemberProfile = async () => {
  const user = await currentUser();
  const userEmail = user.emailAddresses[0].emailAddress;
  const userId = user.id;
  console.log("MemberProfile userId", userId);

  await fetchOrInitializeTokens(userId);

  return (
    <div className="my-4">
      <div className="flex items-center gap-2">
        <UserButton afterSignOutUrl="/" />
        <span className="text-sm">
          {userEmail}
        </span>
      </div>
    </div>
  )
}

export default MemberProfile