import { ActionType, createAction } from "typesafe-actions";
import { IErrorActionData } from "../models/error";
import { IGetMovieDetailSuccessActionData } from "../models/getMovieDetail";

export enum GetMovieDetailActionTypes {
  GET_MOVIE_DETAIL = "GET_MOVIE_DETAIL",
  GET_MOVIE_DETAIL_SUCCESS = "GET_MOVIE_DETAIL_SUCCESS",
  GET_MOVIE_DETAIL_FAILURE = "GET_MOVIE_DETAIL_FAILURE",
  GET_MOVIE_DETAIL_RESET = "GET_MOVIE_DETAIL_RESET",
}

interface IGetMovieDetailActionData {
  movieId: string;
}

export const getMovieDetail = createAction(
  GetMovieDetailActionTypes.GET_MOVIE_DETAIL
)<IGetMovieDetailActionData>();
export const getMovieDetailSuccess = createAction(
  GetMovieDetailActionTypes.GET_MOVIE_DETAIL_SUCCESS
)<IGetMovieDetailSuccessActionData>();
export const getMovieDetailFailure = createAction(
  GetMovieDetailActionTypes.GET_MOVIE_DETAIL_FAILURE
)<IErrorActionData>();
export const getMovieDetailReset = createAction(
  GetMovieDetailActionTypes.GET_MOVIE_DETAIL_RESET
)();

export type GetMovieDetailActions = ActionType<typeof getMovieDetail>;
type GetMovieDetailSuccess = ActionType<typeof getMovieDetailSuccess>;
type GetMovieDetailFailureAction = ActionType<typeof getMovieDetailFailure>;
type GetMovieDetailResetAction = ActionType<typeof getMovieDetailReset>;

export type GetMovieDetail =
  | GetMovieDetailActions
  | GetMovieDetailSuccess
  | GetMovieDetailFailureAction
  | GetMovieDetailResetAction;
