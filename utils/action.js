"use server";
import OpenAI from "openai";

const openaiClient = new OpenAI(process.env.OPENAI_API_KEY);

export const generateChatResponse = async (chatMessage) => {
  console.log("??? Message Submitted ??? ==>", chatMessage);
  const response = await openaiClient.chat.completions.create({
    messages: [
      {role: "system", content: "You are a helpful assistant."},
      {role: "user", content: chatMessage},
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.3,
  })
  console.log("Verify Query ==>", response.choices[0].message);
  console.log("Response ==>", response);

  return "Completed Query";
}