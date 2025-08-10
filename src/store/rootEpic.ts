import { combineEpics } from "redux-observable";
import getAllMoviesEpic from "../epics/getAllMovies";
import getAllTheatresEpic from "../epics/getAllTheatres";
import getMovieDetailEpic from "../epics/getMovieDetail";
import getShowsByMovieIdEpic from "../epics/getShowsByMovieId";
import createBookingEpic from "../epics/createBooking";
import getAllBookingsEpic from "../epics/getAllBookings";
import getTicketDetailEpic from "../epics/getTicket";
import getBookedSeatsForShowEpic from "../epics/getBookedSeatsForShow";

export const rootEpic = combineEpics(
  getAllMoviesEpic,
  getAllTheatresEpic,
  getMovieDetailEpic,
  getShowsByMovieIdEpic,
  createBookingEpic,
  getAllBookingsEpic,
  getTicketDetailEpic,
  getBookedSeatsForShowEpic
);
