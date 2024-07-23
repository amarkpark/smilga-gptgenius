"use client"

import { getAllTours } from "../utils/action";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";
import { useState } from "react";

const ToursPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["tours", searchValue],
    queryFn: () => getAllTours(searchValue),
  });

  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            className="input input-bordered w-full join-item"
            placeholder="Search tours"
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            required
          />
          <button
            className="btn btn-primary join-item"
            type="button"
            disabled={isPending}
            onClick={() => setSearchValue("")}
          >
            {isPending ? "Searching..." : "Clear"}
          </button>
        </div>
      </form>
      {isPending
        ? <span className="loading loading-ring loading-lg text-secondary"></span>
        : <ToursList data={data} />
      }
    </>
  )
};

export default ToursPage;
