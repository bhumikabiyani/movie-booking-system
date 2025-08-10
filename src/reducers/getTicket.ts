import { Reducer } from "redux";
import { IErrorActionData } from "../models/error";
import { IGetTicketDetailSuccessActionData } from "../models/getTicket";
import { GetTicketDetail, GetTicketDetailActionTypes } from "../actions/getTicket";

export interface IGetTicketDetailState {
  data: IGetTicketDetailSuccessActionData;
  isSuccess: boolean;
  isLoading: boolean;
  error?: IErrorActionData;
}

const initialGetTicketDetailState: IGetTicketDetailState = {
  data: {} as IGetTicketDetailSuccessActionData,
  isSuccess: false,
  isLoading: false,
  error: undefined,
};

const GetTicketDetailReducer: Reducer<IGetTicketDetailState, GetTicketDetail> = (
  state = initialGetTicketDetailState,
  action: GetTicketDetail
) => {
  switch (action.type) {
    case GetTicketDetailActionTypes.GET_TICKET_DETAIL:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        error: undefined,
      };

    case GetTicketDetailActionTypes.GET_TICKET_DETAIL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isSuccess: true,
        isLoading: false,
        error: undefined,
      };

    case GetTicketDetailActionTypes.GET_TICKET_DETAIL_FAILURE:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        error: {
          errorCode: action.payload?.errorCode,
          errorMessage: action.payload?.errorMessage,
          callBack: action.payload?.callBack,
        },
      };

    case GetTicketDetailActionTypes.GET_TICKET_DETAIL_RESET:
      return initialGetTicketDetailState;

    default:
      return state;
  }
};

export default GetTicketDetailReducer;