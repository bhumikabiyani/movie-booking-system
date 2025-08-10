import { mergeMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import { ofType } from "redux-observable";
import {
  GetMovieDetailActionTypes,
  getMovieDetailFailure,
  getMovieDetailSuccess,
} from "../actions/getMovieDetail";
import { IErrorActionData } from "../models/error";
import GetMovieByIdService from "../services/getMovieDetail";

const getMovieByIdEpic = (action$: any) =>
  action$.pipe(
    ofType(GetMovieDetailActionTypes.GET_MOVIE_DETAIL),
    mergeMap((action) => {
      console.log("Action received: GET_MOVIE_DETAIL", action?.payload.movieId);
      return from(GetMovieByIdService(action?.payload.movieId)).pipe(
        map((response) => {
          return getMovieDetailSuccess({
            movie: response?.data?.movie,
            movieId: response?.data?.movieId,
            success: true,
          });
        }),
        catchError((error: IErrorActionData) => {
          console.error("Service error:", error);
          return of(
            getMovieDetailFailure({
              errorCode: error.errorCode,
              errorMessage: error.errorMessage,
              callBack: error.callBack,
            })
          );
        })
      );
    })
  );

export default getMovieByIdEpic;
