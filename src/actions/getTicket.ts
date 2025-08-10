import { ActionType, createAction } from "typesafe-actions";
import { IErrorActionData } from "../models/error";
import { IGetTicketDetailSuccessActionData } from "../models/getTicket";

export enum GetTicketDetailActionTypes {
  GET_TICKET_DETAIL = "GET_TICKET_DETAIL",
  GET_TICKET_DETAIL_SUCCESS = "GET_TICKET_DETAIL_SUCCESS",
  GET_TICKET_DETAIL_FAILURE = "GET_TICKET_DETAIL_FAILURE",
  GET_TICKET_DETAIL_RESET = "GET_TICKET_DETAIL_RESET",
}

interface IGetTicketDetailActionData {
  bookingId: number;
}

export const getTicketDetail = createAction(
  GetTicketDetailActionTypes.GET_TICKET_DETAIL
)<IGetTicketDetailActionData>();
export const getTicketDetailSuccess = createAction(
  GetTicketDetailActionTypes.GET_TICKET_DETAIL_SUCCESS
)<IGetTicketDetailSuccessActionData>();
export const getTicketDetailFailure = createAction(
  GetTicketDetailActionTypes.GET_TICKET_DETAIL_FAILURE
)<IErrorActionData>();
export const getTicketDetailReset = createAction(
  GetTicketDetailActionTypes.GET_TICKET_DETAIL_RESET
)();

export type GetTicketDetailActions = ActionType<typeof getTicketDetail>;
type GetTicketDetailSuccess = ActionType<typeof getTicketDetailSuccess>;
type GetTicketDetailFailureAction = ActionType<typeof getTicketDetailFailure>;
type GetTicketDetailResetAction = ActionType<typeof getTicketDetailReset>;

export type GetTicketDetail =
  | GetTicketDetailActions
  | GetTicketDetailSuccess
  | GetTicketDetailFailureAction
  | GetTicketDetailResetAction;