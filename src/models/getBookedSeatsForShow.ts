export interface IGetBookedSeatsForShowSuccessActionData {
    seats: Iseats[];
    success: boolean;
    }
export interface Iseats {
    id: number;
    seat_number: string;
    occupied: boolean;
    show_id: number;
    }