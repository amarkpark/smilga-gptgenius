import Link from "next/link";
import ToursCard from "./ToursCard";

const ToursList = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <h3 className="text-lg text-center">
      No tours found. Please <Link href="/tours/explore">Explore a new city.</Link>
    </h3>;
  }

  // @ToDo come back and format this not to break cards with long names
  return (
    <div className="grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-8">
      {data.map((tour) => {
        return <ToursCard key={tour.id} tour={tour} />;
      })}
    </div>
  );
};

export default ToursList;
