// @refresh reset

import { fetchOrInitializeTokens } from "@/utils/action";
import { auth } from "@clerk/nextjs/server"

const TokensRemaining = async () => {
  const { userId } = auth();
  console.log("TokensRemaining userId", userId);

  const tokensRemaining = await fetchOrInitializeTokens(userId);
  console.log("TokensRemaining tokensRemaining", tokensRemaining);

  return (
    <div className="my-4 badge badge-lg badge-primary badge-outline">
      Tokens Remaining: {tokensRemaining}
    </div>
  )
}

export default TokensRemaining