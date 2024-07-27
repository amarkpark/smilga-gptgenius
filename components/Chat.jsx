// @refresh reset
"use client"

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import {
  generateChatResponse,
  fetchUserTokensById,
  subtractTokens,
} from "../utils/action";
import toast from "react-hot-toast";

const Chat = () => {
  const { userId } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const NEXT_PUBLIC_MINIMUM_REQUIRED_TOKENS = process.env.NEXT_PUBLIC_MINIMUM_REQUIRED_TOKENS;
  console.log("NEXT_PUBLIC_MINIMUM_REQUIRED_TOKENS", NEXT_PUBLIC_MINIMUM_REQUIRED_TOKENS);

  const { mutate, isPending } = useMutation({
    mutationFn: async (query) => {
      console.log()
      const tokensRemaining = await fetchUserTokensById(userId);

      if (tokensRemaining < NEXT_PUBLIC_MINIMUM_REQUIRED_TOKENS) {
        toast.error("Not enough tokens remaining.");
        return;
      }

      const response = await generateChatResponse([...messages, query])

      if (!response) {
        toast.error("Something went wrong.");
        return;
      }

      setMessages((prev) => [...prev, response.message]);
      const newTokens = await subtractTokens(userId, response.tokens);
      toast.success(`${newTokens} tokens remaining...`);
    }

    // mutationFn: (query) => generateChatResponse([...messages, query]),
    // onSuccess: (data) => {
    //   if (!data) {
    //     toast.error("Something went wrong.");
    //     return;
    //   }
    //   setMessages((prev) => [...prev, data]);
    // }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = {role: "user", content: text};
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  }

  // @TODO implement debounce for this search input?

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role == "user" ? "👤" : "🤖";
          const bcg = role === "user" ? "bg-base-200" : "bg-base-100";

          return (
            <div
              key={index}
              // className={`w-full container mx-auto grid grid-cols-[auto,1fr] gap-4 p-4 ${bcg}`}
              className={`${bcg} flex py-6 -mx-8 px-8 text-l leading-loose border-b border-base-300`}
            >
              <span className="mr-4">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          )
        })}
        {isPending ? <span className="loader"></span> : null}
      </div>
      <form onSubmit={handleSubmit} className="w-full container mx-auto">
        <div className="join w-full">
          <input
            className="input input-bordered w-full join-item"
            placeholder="Message GeniusGPT"
            type="text"
            value={text}
            required
            onChange={(event) => setText(event.target.value)}
          />
          <button
            className="btn btn-primary join-item"
            disabled={isPending}
            type="submit"
          >
            Ask Genius
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat;
