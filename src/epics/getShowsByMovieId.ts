import { mergeMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import { ofType } from "redux-observable";
import { IErrorActionData } from "../models/error";
import { GetShowsByMovieIdActionTypes, getShowsByMovieIdFailure, getShowsByMovieIdSuccess } from "../actions/getShowsByMovieId";
import GetShowsByMovieIdService from "../services/getShowsByMovieId";


const getShowsByMovieIdEpic = (action$: any) =>
  action$.pipe(
    ofType(GetShowsByMovieIdActionTypes.GET_SHOWS_BY_MOVIE_ID),
    mergeMap((action: { payload: { movieId: string } }) => {
      console.log("Action received: GET_SHOWS_BY_MOVIE_ID", action?.payload);
      return from(GetShowsByMovieIdService(action?.payload.movieId)).pipe(
        map((response) => {
          return getShowsByMovieIdSuccess({
            shows: response.data.shows,
            success: true,
          });
        }),
        catchError((error: IErrorActionData) => {
          console.error("Service error:", error);
          return of(
            getShowsByMovieIdFailure({
              errorCode: error.errorCode,
              errorMessage: error.errorMessage,
              callBack: error.callBack,
            })
          );
        })
      );
    })
  );

export default getShowsByMovieIdEpic;