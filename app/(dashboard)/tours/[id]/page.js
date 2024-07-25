import DestinationDetails from "@/components/DestinationDetails";
import { redirect } from "next/navigation";
import { getOneTour } from "../../../../utils/action"
import Link from "next/link";

const DestinationPage = async ({ params }) => {
  const tour = await getOneTour(params.id);

  if (!tour) {
    redirect("/tours");
  }

  return (
    <div>
      <Link href="/tours" className="btn btn-accent mb-12">
        Return to all tours
      </Link>
      <DestinationDetails tour={tour} />
    </div>
  )
}

export default DestinationPage
