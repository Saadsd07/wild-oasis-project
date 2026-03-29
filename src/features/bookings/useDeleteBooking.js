import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {deleteBooking as deleteBookingApi} from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryclient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryclient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => toast.error("Failed to delete booking"),
  });
  return { deleteBooking, isDeletingBooking };
}
