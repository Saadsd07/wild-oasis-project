import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { is } from "date-fns/locale";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
    const clientQuery = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: "checked-out",
            isPaid: true
        }),

        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out`);
            clientQuery.invalidateQueries({ active: true });
            navigate("/");
        },

        onError: (error) => toast.error("An error occurred while checking out the booking")
    });

    return { checkout, isCheckingOut };
          

}