"use client"

import { getAllTours } from "../utils/db";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";

const ToursPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getAllTours(),
  });

  return (
    <>
      {isPending
        ? <span className="loading loading-ring"></span>
        : <ToursList data={data} />
      }
    </>
  )
};

export default ToursPage;
