export interface IGetTicketDetailSuccessActionData {
    booking: IGetTicket;
    success: boolean;
}
export interface IGetTicket {
    booking_id: number;
    show_id: number;
    ticket_no: string;
    total_seats_booked: number;
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
  