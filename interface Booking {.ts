interface Booking {
    id: string;
    guestName: string;
    status: "ACTIVE" | "CANCELLED";
}
class BookingApi {
    async get(
        id: string
    ): Promise<Booking | undefined> {
        // ...
    }
}
async function getActiveBooking(
    id: string,
    bookingApi: BookingApi
): Promise<Booking> {
    const booking = await bookingApi.get(id);
    
    if (booking.status !== "ACTIVE") {
        throw new Error("Booking is not active");
    }
    return booking;
}
//Promise<Booking | undefined>