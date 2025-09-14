import { ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";
import { from, of } from "rxjs";
import {
  GetAllTheatresActionTypes,
  getAllTheatresFailure,
  getAllTheatresSuccess,
} from "../actions/getAllTheatres";
import { IErrorActionData } from "../models/error";
import GetAllTheatresService from "../services/getAllTheatres";

const getAllTheatresEpic = (action$: any) =>
  action$.pipe(
    ofType(GetAllTheatresActionTypes.GET_ALL_THEATRES),
    mergeMap((action: { type: string; payload: { location: string } })=> {
      console.log("Action received: GET_ALL_THEATRES");
      return from(GetAllTheatresService(action.payload.location)).pipe(
        map((response) => {
          return getAllTheatresSuccess({
            theatres: response.data.theatres,
            success: true,
          });
        }),
        catchError((error: IErrorActionData) => {
          console.error("get all theatre Service error:", error);
          return of(
            getAllTheatresFailure({
              errorCode: error.errorCode,
              errorMessage: error.errorMessage,
              callBack: error.callBack,
            })
          );
        })
      );
    })
  );

export default getAllTheatresEpic;