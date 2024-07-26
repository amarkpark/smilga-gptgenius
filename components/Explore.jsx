"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getExistingTour,
  generateTourResponse,
  createNewTour,
  fetchUserTokensById,
  subtractTokens
} from "../utils/action"
import DestinationDetails from "./DestinationDetails"
import { toast } from "react-hot-toast"
import { useAuth } from "@clerk/nextjs"

const Explore = () => {
  const MINIMUM_TOUR_TOKENS = process.env.MINIMUM_TOUR_TOKENS;
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const {mutate, isPending, data:tour} = useMutation({
    // these actions are built to run on client component because 
    // Vercel has a timeout for Server-Side actions
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) {
        console.log("returning existing tour", existingTour);
        return existingTour;
      }

      const tokensRemaining = await fetchUserTokensById(userId);

      if (tokensRemaining < MINIMUM_TOUR_TOKENS) {
        toast.error("Not enough tokens remaining.");
        return;
      }

      const newTour = await generateTourResponse(destination);
      console.log("new tour in mutation", newTour);

      if (!newTour || newTour.tour === null) {
        toast.error("Destination not found.");
        return null;
      }

      console.log("Tour destination", newTour.tour);
      await createNewTour(newTour.tour);
      queryClient.invalidateQueries({queryKey: ["tours"]});
      const newTokens = await subtractTokens(userId, newTour.tokens);
      toast.success(`${newTokens} tokens remaining...`);
      return newTour.tour;

    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    console.log(destination);
    mutate(destination);
  }

  if (isPending) {
    return <span className="loading loading-ring loading-lg text-secondary"></span>;
  }

  // @ToDo: add image fetching to this page also, or in the component?
  return (
    <>
      <h2 className="text-3xl m-4 flex gap-2 items-center">
        Explore a Destination
        <span className="text-4xl m-4">
          &#128373; &#129517; &#128506;
        </span>
      </h2>
      <form onSubmit={handleSubmit} className="w-full container mx-auto">
        <div className="join w-full">
          <input
            className="input input-bordered w-full join-item"
            name="city"
            placeholder="city"
            required
            type="text"
          />
          <input
            className="input input-bordered w-full join-item"
            name="country"
            placeholder="country"
            required
            type="text"
          />
          <button
            className="btn btn-primary join-item"
            type="submit"
          >
            Generate Tour
          </button>
        </div>
      </form>
      <div className="mt-16">
        {tour ? <DestinationDetails tour={tour} /> : null}
      </div>
    </>
  )
}

export default Explore
