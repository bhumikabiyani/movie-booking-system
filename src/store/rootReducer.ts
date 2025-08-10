import { combineReducers } from "redux";
import GetAllMoviesReducer from "../reducers/getAllMovies";
import GetAllTheatresReducer from "../reducers/getAllTheatre";
import GetMovieDetailReducer from "../reducers/getMovieDetail";
import GetShowsByMovieIdReducer from "../reducers/getShowsByMovieId";
import CreateBookingReducer from "../reducers/createBooking";
import GetAllBookingsReducer from "../reducers/getAllBookings";
import GetTicketDetailReducer from "../reducers/getTicket";
import GetBookedSeatsForShowReducer from "../reducers/getBookedSeatsForShow";
export const rootReducers = combineReducers({
  GetAllMoviesReducer,
  GetAllTheatresReducer,
  GetMovieDetailReducer,
  GetShowsByMovieIdReducer,
  CreateBookingReducer,
  GetAllBookingsReducer,
  GetTicketDetailReducer,
  GetBookedSeatsForShowReducer
});
