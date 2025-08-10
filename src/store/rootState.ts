import { ICreateBookingState } from "../reducers/createBooking";
import { IGetAllBookingsState } from "../reducers/getAllBookings";
import { IGetAllMoviesState } from "../reducers/getAllMovies";
import { IGetAllTheatresState } from "../reducers/getAllTheatre";
import { IGetBookedSeatsForShowState } from "../reducers/getBookedSeatsForShow";
import { IGetMovieDetailState } from "../reducers/getMovieDetail";
import { IGetShowsByMovieIdState } from "../reducers/getShowsByMovieId";
import { IGetTicketDetailState } from "../reducers/getTicket";

export type rootState = {
  getAllMovies: IGetAllMoviesState;
  getAllTheatres: IGetAllTheatresState;
  getMovieDetail: IGetMovieDetailState;
  getShowsByMovieId: IGetShowsByMovieIdState;
  createBooking: ICreateBookingState;
  getAllBookings: IGetAllBookingsState;
  getTicketDetail: IGetTicketDetailState;
  getBookedSeatsForShow: IGetBookedSeatsForShowState;
};
