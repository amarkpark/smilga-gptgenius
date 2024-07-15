import Explore from "@/components/Explore"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ExplorePage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Explore />
    </HydrationBoundary>
  );
};

export default ExplorePage;

