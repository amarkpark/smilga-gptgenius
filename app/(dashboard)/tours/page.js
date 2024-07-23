import ToursPage from "@/components/ToursPage"
import { getAllTours } from "@/utils/action";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AllToursPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tours"],
    queryFn: () => getAllTours(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      Happy ToursPage &#128513;
      <ToursPage />
    </HydrationBoundary>
  );
};

export default AllToursPage;
