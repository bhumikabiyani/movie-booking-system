import { mergeMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import { ofType } from "redux-observable";
import { IErrorActionData } from "../models/error";
import {
  GetBookedSeatsForShowActionTypes,
  getBookedSeatsForShowFailure,
  getBookedSeatsForShowSuccess,
} from "../actions/getBookedSeatsForShow";
import GetBookedSeatsForShowService from "../services/getBookedSeatsForShow";

const getBookedSeatsForShowEpic = (action$: any) =>
  action$.pipe(
    ofType(GetBookedSeatsForShowActionTypes.GET_BOOKED_SEATS_FOR_SHOW),
    mergeMap((action: { payload: { showId: number } }) => {
      console.log("Action received: GET_BOOKED_SEATS_FOR_SHOW", action?.payload);
      return from(GetBookedSeatsForShowService(action?.payload.showId)).pipe(
        map((response) => {
          return getBookedSeatsForShowSuccess({
            seats: response.data.seats,
            success: true,
          });
        }),
        catchError((error: IErrorActionData) => {
          console.error("get booked seats for show Service error:", error);
          return of(
            getBookedSeatsForShowFailure({
              errorCode: error.errorCode,
              errorMessage: error.errorMessage,
              callBack: error.callBack,
            })
          );
        })
      );
    })
  );

export default getBookedSeatsForShowEpic;