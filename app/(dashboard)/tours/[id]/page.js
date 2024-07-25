import DestinationDetails from "@/components/DestinationDetails";
import { redirect } from "next/navigation";
import { generateTourImage, getOneTour } from "../../../../utils/action"
import Link from "next/link";
import Image from "next/image";

const DestinationPage = async ({ params }) => {
  const tour = await getOneTour(params.id);

  if (!tour) {
    redirect("/tours");
  }

  const tourImage = await generateTourImage({
    city: tour.city,
    country: tour.country,
  });

  return (
    <div>
      <Link href="/tours" className="btn btn-accent mb-12">
        Return to all tours
      </Link>
      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
            alt={tour.title}
            priority
          />
        </div>
      ) : null}
      <DestinationDetails tour={tour} />
    </div>
  )
}

export default DestinationPage
