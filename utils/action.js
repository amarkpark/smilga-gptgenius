"use server";
import OpenAI from "openai";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

const openaiClient = new OpenAI(process.env.OPENAI_API_KEY);

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openaiClient.chat.completions.create({
      messages: [
        {role: "system", content: "You are a helpful assistant."},
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.3,
    })
  
    return response.choices[0].message;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const generateTourResponse = async ({ city, country}) => {
  console.log("generate tour response for: ", city, country);
  const query = `Find a ${city} in this ${country}.
If ${city} in this ${country} exists, create a list of things active adult travelers can do to discover the delights of this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "description of the city and tour",
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
  }
}
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;
// console.log("generateTourResponse query", query);
  try {
    const response = await openaiClient.chat.completions.create({
      messages: [
        {role: "system", content: "You are a tour guide."},
        {role: "user", content: query}
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.3,
    });

    // console.dir("this is the response", response);

    // console.log(response.choices[0].message.content);
    const tourData = JSON.parse(response.choices[0].message.content);
    // console.log("this is the tour data generateTourResponse", tourData);

    if (!tourData.tour) {
      return null;
    }
    // return tourData.tour;
    return { 
      tour: tourData.tour,
      tokens: response.usage.total_tokens 
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
export const generateTourImage = async ({ city, country }) => {
  try {
    const tourImage = await openaiClient.images.generate({
      prompt: `a panoramic view of the ${city} ${country}`,
      n: 1,
      size: '512x512',
    });
    return tourImage?.data[0]?.url;
  } catch (error) {
    return null;
  }
};

export const getExistingTour = async ({ city, country }) => {
  console.log("get existing tour", city, country);
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

export const createNewTour = async (tour) => {
  console.log("create new tour", tour);
  return prisma.tour.create({
    data: tour,
  });
};

export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    console.log("getAllTours searching for all tours");
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: "asc",
      },
    });

    return tours;
  }

  console.log("getAllTours searching for", searchTerm);

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: "asc",
    },
  });

  return tours;
}

export const getOneTour = async (id) => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
}

export const fetchUserTokensById = async (clerkId) => {
  const result = await prisma.token.findUnique({
    where: {
      clerkId,
    },
  });

  return result?.tokens;
};

export const initializeUserTokensForId = async (clerkId) => {
  const result = await prisma.token.create({
    data: {
      clerkId,
    },
  });

  return result?.tokens;
};

export const fetchOrInitializeTokens = async (clerkId) => {
  console.log("fetchOrInitializeTokens action", clerkId);
  const result = await fetchUserTokensById(clerkId);
  console.log("fetchOrInitializeTokens result", result);

  if (result) {
    return result;
  }

  return (await initializeUserTokensForId(clerkId)).tokens;
};

export const subtractTokens = async (clerkId, tokens) => {
  const result = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  });

  revalidatePath("/profile");

  // Return the new token value
  return result.tokens;
};