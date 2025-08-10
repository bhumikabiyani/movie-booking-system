import { ActionType, createAction } from "typesafe-actions";
import { IErrorActionData } from "../models/error";
import { IGetAllTheatresSuccessActionData } from "../models/getAllTheatres";

export enum GetAllTheatresActionTypes {
  GET_ALL_THEATRES = "GET_ALL_THEATRES",
  GET_ALL_THEATRES_SUCCESS = "GET_ALL_THEATRES_SUCCESS",
  GET_ALL_THEATRES_FAILURE = "GET_ALL_THEATRES_FAILURE",
  GET_ALL_THEATRES_RESET = "GET_ALL_THEATRES_RESET",
}

export const getAllTheatres = createAction(
  GetAllTheatresActionTypes.GET_ALL_THEATRES
)<{ location: string }>();
export const getAllTheatresSuccess = createAction(
  GetAllTheatresActionTypes.GET_ALL_THEATRES_SUCCESS
)<IGetAllTheatresSuccessActionData>();
export const getAllTheatresFailure = createAction(
  GetAllTheatresActionTypes.GET_ALL_THEATRES_FAILURE
)<IErrorActionData>();
export const getAllTheatresReset = createAction(
  GetAllTheatresActionTypes.GET_ALL_THEATRES_RESET
)();

export type GetAllTheatresAction = ActionType<typeof getAllTheatres>;
type GetAllTheatresSuccessAction = ActionType<typeof getAllTheatresSuccess>;
type GetAllTheatresFailureAction = ActionType<typeof getAllTheatresFailure>;
type GetAllTheatresResetAction = ActionType<typeof getAllTheatresReset>;

export type GetAllTheatres =
  | GetAllTheatresAction
  | GetAllTheatresSuccessAction
  | GetAllTheatresFailureAction
  | GetAllTheatresResetAction;