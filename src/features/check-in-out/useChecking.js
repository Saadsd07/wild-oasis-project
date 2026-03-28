import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { is } from "date-fns/locale";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useChecking() {
    const clientQuery = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: (bookingId)=>updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true
        }),

        onSuccess:(data) =>{
            toast.success(`Booking #${data.id} successfully checked in`);
            clientQuery.invalidateQueries({active: true});
            navigate("/")
        },

        onError: (error) => toast.error("An error occurred while checking in the booking")

    })

    return {checkin, isCheckingIn}
}