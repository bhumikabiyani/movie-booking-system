import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import {
  GetAllBookingsActionTypes,
  getAllBookingsFailure,
  getAllBookingsSuccess,
} from "../actions/getAllBookings";
import { IErrorActionData } from "../models/error";
import GetAllBookingsService from "../services/getAllBooking";

const getAllBookingsEpic = (action$: any) =>
  action$.pipe(
    ofType(GetAllBookingsActionTypes.GET_ALL_BOOKINGS),
    mergeMap((action: any) => {
      console.log("Action received: GET_ALL_BOOKINGS");
      return from(GetAllBookingsService()).pipe(
        map((response) => {
          return getAllBookingsSuccess({
            booking: response.data.bookings,
            success: true,
          });
        }),
        catchError((error: IErrorActionData) => {
          console.error("get all booking Service error:", error);
          return of(
            getAllBookingsFailure({
              errorCode: error.errorCode,
              errorMessage: error.errorMessage,
              callBack: error.callBack,
            })
          );
        })
      );
    })
  );

export default getAllBookingsEpic;