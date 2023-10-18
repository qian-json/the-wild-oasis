import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings";
import {useSearchParams} from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {field: "status", value: filterValue, method: "eq"};

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
  const [field, order] = sortByRaw.split("-");
  const sortBy = {field, order};

  const {
    isLoading,
    data: {data: bookings, count},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({filter, sortBy}),
  });
  console.log(count);

  return {isLoading, bookings, count, error};
}
