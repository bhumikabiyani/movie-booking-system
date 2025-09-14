export interface IGetBookedSeatsForShowSuccessActionData {
    seats: string[];
    success: boolean;
}

// Legacy interface - keeping for backward compatibility if needed
export interface Iseats {
    id: number;
    seat_number: string;
    occupied: boolean;
    show_id: number;
}