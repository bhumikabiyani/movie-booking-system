import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import {
  GetAllMoviesActionTypes,
  getAllMoviesFailure,
  getAllMoviesSuccess,
} from "../actions/getAllMovies";
import { IErrorActionData } from "../models/error";
import { GetAllMoviesService } from "../services/getAllMovies";

const getAllMoviesEpic = (action$: any) =>
  action$.pipe(
    ofType(GetAllMoviesActionTypes.GET_ALL_MOVIES),
    mergeMap((action: { type: string; payload: { language: string } }) => {
      console.log("Action received: GET_ALL_MOVIES");
      return from(GetAllMoviesService(action.payload.language)).pipe(
        map((response) => {
          return getAllMoviesSuccess({
            movies: response.data.movies,
            success: true,
          });
        }),
        catchError((error: IErrorActionData) => {
          console.error("get all movies Service error:", error);
          return of(
            getAllMoviesFailure({
              errorCode: error.errorCode,
              errorMessage: error.errorMessage,
              callBack: error.callBack,
            })
          );
        })
      );
    })
  );

export default getAllMoviesEpic;