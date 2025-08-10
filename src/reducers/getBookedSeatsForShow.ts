import { IErrorActionData } from "../models/error";
import { Reducer } from "redux";
import { IGetBookedSeatsForShowSuccessActionData } from "../models/getBookedSeatsForShow";
import {
  GetBookedSeatsForShow,
  GetBookedSeatsForShowActionTypes,
} from "../actions/getBookedSeatsForShow";

export interface IGetBookedSeatsForShowState {
  data: IGetBookedSeatsForShowSuccessActionData;
  isSuccess: boolean;
  isLoading: boolean;
  error?: IErrorActionData;
}

const initialGetBookedSeatsForShowState: IGetBookedSeatsForShowState = {
  data: {} as IGetBookedSeatsForShowSuccessActionData,
  isSuccess: false,
  isLoading: false,
  error: undefined,
};

const GetBookedSeatsForShowReducer: Reducer<
  IGetBookedSeatsForShowState,
  GetBookedSeatsForShow
> = (
  state = initialGetBookedSeatsForShowState,
  action: GetBookedSeatsForShow
) => {
  switch (action.type) {
    case GetBookedSeatsForShowActionTypes.GET_BOOKED_SEATS_FOR_SHOW:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        error: undefined,
      };

    case GetBookedSeatsForShowActionTypes.GET_BOOKED_SEATS_FOR_SHOW_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isSuccess: true,
        isLoading: false,
        error: undefined,
      };

    case GetBookedSeatsForShowActionTypes.GET_BOOKED_SEATS_FOR_SHOW_FAILURE:
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

    case GetBookedSeatsForShowActionTypes.GET_BOOKED_SEATS_FOR_SHOW_RESET:
      return initialGetBookedSeatsForShowState;

    default:
      return state;
  }
};

export default GetBookedSeatsForShowReducer;
