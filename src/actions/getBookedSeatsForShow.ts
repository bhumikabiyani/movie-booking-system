import { ActionType, createAction } from "typesafe-actions";
import { IErrorActionData } from "../models/error";
import { IGetBookedSeatsForShowSuccessActionData } from "../models/getBookedSeatsForShow";

export enum GetBookedSeatsForShowActionTypes {
  GET_BOOKED_SEATS_FOR_SHOW = "GET_BOOKED_SEATS_FOR_SHOW",
  GET_BOOKED_SEATS_FOR_SHOW_SUCCESS = "GET_BOOKED_SEATS_FOR_SHOW_SUCCESS",
  GET_BOOKED_SEATS_FOR_SHOW_FAILURE = "GET_BOOKED_SEATS_FOR_SHOW_FAILURE",
  GET_BOOKED_SEATS_FOR_SHOW_RESET = "GET_BOOKED_SEATS_FOR_SHOW_RESET",
}

interface IGetBookedSeatsForShowActionData {
  showId: number;
}

export const getBookedSeatsForShow = createAction(
  GetBookedSeatsForShowActionTypes.GET_BOOKED_SEATS_FOR_SHOW
)<IGetBookedSeatsForShowActionData>();
export const getBookedSeatsForShowSuccess = createAction(
  GetBookedSeatsForShowActionTypes.GET_BOOKED_SEATS_FOR_SHOW_SUCCESS
)<IGetBookedSeatsForShowSuccessActionData>(); 
export const getBookedSeatsForShowFailure = createAction(
  GetBookedSeatsForShowActionTypes.GET_BOOKED_SEATS_FOR_SHOW_FAILURE
)<IErrorActionData>();
export const getBookedSeatsForShowReset = createAction(
  GetBookedSeatsForShowActionTypes.GET_BOOKED_SEATS_FOR_SHOW_RESET
)();

export type GetBookedSeatsForShowActions = ActionType<typeof getBookedSeatsForShow>;
type GetBookedSeatsForShowSuccess = ActionType<typeof getBookedSeatsForShowSuccess>;
type GetBookedSeatsForShowFailureAction = ActionType<typeof getBookedSeatsForShowFailure>;
type GetBookedSeatsForShowResetAction = ActionType<typeof getBookedSeatsForShowReset>;

export type GetBookedSeatsForShow =
  | GetBookedSeatsForShowActions
  | GetBookedSeatsForShowSuccess
  | GetBookedSeatsForShowFailureAction
  | GetBookedSeatsForShowResetAction;