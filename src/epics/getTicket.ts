import { mergeMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import { ofType } from "redux-observable";
import { IErrorActionData } from "../models/error";
import {
  GetTicketDetailActionTypes,
  getTicketDetailFailure,
  getTicketDetailSuccess,
} from "../actions/getTicket";
import GetTicketService from "../services/getTicket";

const getTicketDetailEpic = (action$: any) =>
  action$.pipe(
    ofType(GetTicketDetailActionTypes.GET_TICKET_DETAIL),
    mergeMap((action: { payload: { bookingId: number } }) => {
      console.log("Action received: GET_TICKET_DETAIL", action.payload);

      return from(GetTicketService(action?.payload.bookingId)).pipe(
        map((response) => {
          // console.log("response of epic:", response);
          return getTicketDetailSuccess({
            booking: response.booking,
            success: true,
          });
        }),
        catchError((error: IErrorActionData) => {
          console.error("Service error:", error);
          return of(
            getTicketDetailFailure({
              errorCode: error.errorCode,
              errorMessage: error.errorMessage,
              callBack: error.callBack,
            })
          );
        })
      );
    })
  );

export default getTicketDetailEpic;
