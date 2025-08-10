import { ActionType, createAction } from "typesafe-actions";
import { IErrorActionData } from "../models/error";
import { IGetAllMoviesSuccessActionData } from "../models/getAllMovies";

export enum GetAllMoviesActionTypes {
  GET_ALL_MOVIES = "GET_ALL_MOVIES",
  GET_ALL_MOVIES_SUCCESS = "GET_ALL_MOVIES_SUCCESS",
  GET_ALL_MOVIES_FAILURE = "GET_ALL_MOVIES_FAILURE",
  GET_ALL_MOVIES_RESET = "GET_ALL_MOVIES_RESET",
}

export const getAllMovies = createAction(
  GetAllMoviesActionTypes.GET_ALL_MOVIES
)<{ language?: string }>();
export const getAllMoviesSuccess = createAction(
  GetAllMoviesActionTypes.GET_ALL_MOVIES_SUCCESS
)<IGetAllMoviesSuccessActionData>();
export const getAllMoviesFailure = createAction(
  GetAllMoviesActionTypes.GET_ALL_MOVIES_FAILURE
)<IErrorActionData>();
export const getAllMoviesReset = createAction(
  GetAllMoviesActionTypes.GET_ALL_MOVIES_RESET
)();

export type GetAllMoviesAction = ActionType<typeof getAllMovies>;
type GetAllMoviesSuccessAction = ActionType<typeof getAllMoviesSuccess>;
type GetAllMoviesFailureAction = ActionType<typeof getAllMoviesFailure>;
type GetAllMoviesResetAction = ActionType<typeof getAllMoviesReset>;

export type GetAllMovies =
  | GetAllMoviesAction
  | GetAllMoviesSuccessAction
  | GetAllMoviesFailureAction
  | GetAllMoviesResetAction;
