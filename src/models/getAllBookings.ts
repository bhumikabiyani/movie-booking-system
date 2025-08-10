export interface IGetAllBookingSuccessActionData{
    booking: IAllBooking[];
    success: boolean;
}
export interface IAllBooking {
    booking_id: number;
    show_id: number;
    ticket_no: string;
    total_seats_booked: number;
    seats: string[] | null;
    booking_info: {
        movie_name: string;
        language: string;
        image_url: string;
        duration: string;
        rating: string;
        release_dates: string;
        genre: string;
        show_start_time: string;
        show_date: string;
        theatre_id: number;
        seats: string[];
    };
}
