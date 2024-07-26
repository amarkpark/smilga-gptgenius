import TokensRemaining from "@/components/TokensRemaining"
import { UserProfile } from "@clerk/nextjs"

function ProfilePage() {

  return <div>
    <TokensRemaining />
    <UserProfile />
  </div>
}

export default ProfilePage
