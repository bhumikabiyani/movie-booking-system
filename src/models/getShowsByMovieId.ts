export interface IGetShowsByMovieIdSuccessActionData {
    shows: IShowsByMovieId[];
    success: boolean;
}
export interface IShowsByMovieId {
  id: number;
  start_time: string;
  date: string;
  theatre_id: number;
  theatre_name: string;
}


