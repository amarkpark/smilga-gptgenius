import DestinationDetails from "@/components/DestinationDetails";
import { redirect } from "next/navigation";
import { generateTourImage, getOneTour } from "../../../../utils/action"
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const urlUnsplash = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const DestinationPage = async ({ params }) => {
  const tour = await getOneTour(params.id);

  if (!tour) {
    redirect("/tours");
  }

  const {data} = await axios.get(`${urlUnsplash}${tour.city},${tour.country}`)
  .catch(function (error) {
    // care of https://axios-http.com/docs/handling_errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error fetching unsplash Data", error.response.data);
      console.error("Error fetching unsplash Status", error.response.status);
      console.error("Error fetching unsplash Headers", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error("Error fetching unsplash no res", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error fetching unsplash setup", error.message);
    }
    console.error("Error fetching unsplash config", error.config);
  });

  const tourImage = data?.results[0]?.urls?.raw || null;

  // // This is for generating an image with OpenAPI == $expensive
  // const tourImage = await generateTourImage({
  //   city: tour.city,
  //   country: tour.country,
  // });

  // @ToDo: Implement a partial loading solution
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
