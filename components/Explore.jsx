"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getExistingTour, generateTourResponse, createNewTour } from "../utils/action"
import DestinationDetails from "./DestinationDetails"
import { toast } from "react-hot-toast"

const Explore = () => {
  const queryClient = useQueryClient();
  const {mutate, isPending, data:tour} = useMutation({
    mutationFn: async (destination) => {
      // const existingTour = await getExistingTour(destination);
      // if (existingTour) {
      //   console.log("returning existing tour", existingTour);
      //   return existingTour;
      // }

      const newTour = await generateTourResponse(destination);
      if (!newTour || newTour.tour === null) {
        toast.error("Destination not found.");
        return null;
      }

      console.log("Tour destination", newTour);
      await createNewTour(newTour);
      queryClient.invalidateQueries({queryKey: ["tours"]});
      return newTour;

    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    // const formData = new FormData(event.target);
    // const city = formData.get("city");
    // const country = formData.get("country");
    // console.log(city, country);
    const formData = new FormData(event.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    console.log(destination);
    mutate(destination);
  }

  if (isPending) {
    return <span className="loading loading-ring loading-lg text-secondary"></span>;
  }

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
