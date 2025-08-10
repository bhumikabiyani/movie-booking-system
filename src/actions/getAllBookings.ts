import { ActionType, createAction } from "typesafe-actions";
import { IErrorActionData } from "../models/error";
import { IGetAllBookingSuccessActionData } from "../models/getAllBookings";
export enum GetAllBookingsActionTypes {
  GET_ALL_BOOKINGS = "GET_ALL_BOOKINGS",
  GET_ALL_BOOKINGS_SUCCESS = "GET_ALL_BOOKINGS_SUCCESS",
  GET_ALL_BOOKINGS_FAILURE = "GET_ALL_BOOKINGS_FAILURE",
  GET_ALL_BOOKINGS_RESET = "GET_ALL_BOOKINGS_RESET",
}

export const getAllBookings = createAction(
  GetAllBookingsActionTypes.GET_ALL_BOOKINGS
)();
export const getAllBookingsSuccess = createAction(
  GetAllBookingsActionTypes.GET_ALL_BOOKINGS_SUCCESS
)<IGetAllBookingSuccessActionData>();
export const getAllBookingsFailure = createAction(
  GetAllBookingsActionTypes.GET_ALL_BOOKINGS_FAILURE
)<IErrorActionData>();
export const getAllBookingsReset = createAction(
  GetAllBookingsActionTypes.GET_ALL_BOOKINGS_RESET
)();

export type GetAllBookingsAction = ActionType<typeof getAllBookings>;
type GetAllBookingsSuccessAction = ActionType<typeof getAllBookingsSuccess>;
type GetAllBookingsFailureAction = ActionType<typeof getAllBookingsFailure>;
type GetAllBookingsResetAction = ActionType<typeof getAllBookingsReset>;


//helpful for reducer, handles all action together in a switch statement
export type GetAllBookings =
  | GetAllBookingsAction
  | GetAllBookingsSuccessAction
  | GetAllBookingsFailureAction
  | GetAllBookingsResetAction;