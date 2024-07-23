import Link from "next/link";
const ToursCard = ({ tour }) => {
  const { city, id, country } = tour;
  return (
    <Link href={`/tours/${id}`}>
      <div className="card card-compact bg-base-100 rounded-xl shadow-md">
        <div className="card-body whitespace-nowrap items-center text-center">
          <h2 className="card-title whitespace-nowrap text-center">
            {city},&nbsp;{country}
          </h2>
        </div>
      </div>
    </Link>
  )
};

export default ToursCard;
