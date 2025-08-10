import { ActionType, createAction } from "typesafe-actions";
import { IErrorActionData } from "../models/error";
import { ICreateBookingSuccessActionData } from "../models/createBooking";

export enum CreateBookingActionTypes {
  CREATE_BOOKING = "CREATE_BOOKING",
  CREATE_BOOKING_SUCCESS = "CREATE_BOOKING_SUCCESS",
  CREATE_BOOKING_FAILURE = "CREATE_BOOKING_FAILURE",
  CREATE_BOOKING_RESET = "CREATE_BOOKING_RESET",
}

export const createBooking = createAction(
  CreateBookingActionTypes.CREATE_BOOKING
)<{ show_id: number; seats: string[] }>();
export const createBookingSuccess = createAction(
  CreateBookingActionTypes.CREATE_BOOKING_SUCCESS
)<ICreateBookingSuccessActionData>();
export const createBookingFailure = createAction(
  CreateBookingActionTypes.CREATE_BOOKING_FAILURE
)<IErrorActionData>();
export const createBookingReset = createAction(
  CreateBookingActionTypes.CREATE_BOOKING_RESET
)();

export type CreateBookingAction = ActionType<typeof createBooking>;
type CreateBookingSuccessAction = ActionType<typeof createBookingSuccess>;
type CreateBookingFailureAction = ActionType<typeof createBookingFailure>;
type CreateBookingResetAction = ActionType<typeof createBookingReset>;

export type CreateBooking =
  | CreateBookingAction
  | CreateBookingSuccessAction
  | CreateBookingFailureAction
  | CreateBookingResetAction;