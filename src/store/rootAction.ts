import { CreateBooking } from "../actions/createBooking";
import { GetAllBookings } from "../actions/getAllBookings";
import { GetAllMovies } from "../actions/getAllMovies";
import { GetAllTheatres } from "../actions/getAllTheatres";
import { GetBookedSeatsForShow } from "../actions/getBookedSeatsForShow";
import { GetMovieDetail } from "../actions/getMovieDetail";
import { GetShowsByMovieId } from "../actions/getShowsByMovieId";
import { GetTicketDetail } from "../actions/getTicket";

type RootAction =
  | GetAllMovies
  | GetAllTheatres
  | GetMovieDetail
  | GetShowsByMovieId
  | CreateBooking
  | GetAllBookings
  | GetBookedSeatsForShow
  | GetTicketDetail;

export default RootAction;
