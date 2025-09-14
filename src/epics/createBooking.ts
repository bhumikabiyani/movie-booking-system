import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import {
  CreateBookingActionTypes,
  createBookingFailure,
  createBookingSuccess,
} from "../actions/createBooking";
import { IErrorActionData } from "../models/error";
import { CreateBookingService } from "../services/createBooking";

const createBookingEpic = (action$: any) =>
  action$.pipe(
    ofType(CreateBookingActionTypes.CREATE_BOOKING),
    mergeMap((action: any) => {
      console.log("Action received: CREATE_BOOKING");
      return from(CreateBookingService(action.payload)).pipe(
        map((response) => {
          return createBookingSuccess({
            booking: response.data.booking,
            success: true,
          });
        }),
        catchError((error: IErrorActionData) => {
          console.error("Create Booking Service error:", error.errorMessage);
          return of(
            createBookingFailure({
              errorCode: error.errorCode,
              errorMessage: error.errorMessage,
              callBack: error.callBack,
            })
          );
        })
      );
    })
  );

export default createBookingEpic;
