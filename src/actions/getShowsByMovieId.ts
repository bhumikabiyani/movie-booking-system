import { ActionType, createAction } from "typesafe-actions";
import { IErrorActionData } from "../models/error";
import {  } from "../models/getMovieDetail";
import { IGetShowsByMovieIdSuccessActionData } from "../models/getShowsByMovieId";

export enum GetShowsByMovieIdActionTypes {
  GET_SHOWS_BY_MOVIE_ID = "GET_SHOWS_BY_MOVIE_ID",
  GET_SHOWS_BY_MOVIE_ID_SUCCESS = "GET_SHOWS_BY_MOVIE_ID_SUCCESS",
  GET_SHOWS_BY_MOVIE_ID_FAILURE = "GET_SHOWS_BY_MOVIE_ID_FAILURE",
  GET_SHOWS_BY_MOVIE_ID_RESET = "GET_SHOWS_BY_MOVIE_ID_RESET",
}

interface IGetShowsByMovieIdActionData {
  movieId: string;
}

export const getShowsByMovieId = createAction(
  GetShowsByMovieIdActionTypes.GET_SHOWS_BY_MOVIE_ID
)<IGetShowsByMovieIdActionData>();
export const getShowsByMovieIdSuccess = createAction(
  GetShowsByMovieIdActionTypes.GET_SHOWS_BY_MOVIE_ID_SUCCESS
)<IGetShowsByMovieIdSuccessActionData>(); 
export const getShowsByMovieIdFailure = createAction(
  GetShowsByMovieIdActionTypes.GET_SHOWS_BY_MOVIE_ID_FAILURE
)<IErrorActionData>();
export const getShowsByMovieIdReset = createAction(
  GetShowsByMovieIdActionTypes.GET_SHOWS_BY_MOVIE_ID_RESET
)();

export type GetShowsByMovieIdActions = ActionType<typeof getShowsByMovieId>;
type GetShowsByMovieIdSuccess = ActionType<typeof getShowsByMovieIdSuccess>;
type GetShowsByMovieIdFailureAction = ActionType<typeof getShowsByMovieIdFailure>;
type GetShowsByMovieIdResetAction = ActionType<typeof getShowsByMovieIdReset>;

export type GetShowsByMovieId =
  | GetShowsByMovieIdActions
  | GetShowsByMovieIdSuccess
  | GetShowsByMovieIdFailureAction
  | GetShowsByMovieIdResetAction;
