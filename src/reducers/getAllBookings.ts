import { Reducer } from "redux";
import { IErrorActionData } from "../models/error";
import { IGetAllBookingSuccessActionData } from "../models/getAllBookings";
import { GetAllBookings, GetAllBookingsActionTypes } from "../actions/getAllBookings";


export interface IGetAllBookingsState {
  data: IGetAllBookingSuccessActionData;
  isSuccess: boolean;
  isLoading: boolean;
  error?: IErrorActionData;
}

const initialGetAllBookingsState: IGetAllBookingsState = {
  data: {} as IGetAllBookingSuccessActionData,
  isSuccess: false,
  isLoading: false,
  error: undefined,
};

const GetAllBookingsReducer: Reducer<IGetAllBookingsState, GetAllBookings> = (
  state = initialGetAllBookingsState,
  action: GetAllBookings
) => {
  switch (action.type) {
    case GetAllBookingsActionTypes.GET_ALL_BOOKINGS:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        error: undefined,
      };

    case GetAllBookingsActionTypes.GET_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        data: { booking: action.payload.booking, success: true },
        isSuccess: true,
        isLoading: false,
        error: undefined,
      };

    case GetAllBookingsActionTypes.GET_ALL_BOOKINGS_FAILURE:
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

    case GetAllBookingsActionTypes.GET_ALL_BOOKINGS_RESET:
      return initialGetAllBookingsState;

    default:
      return state;
  }
};

export default GetAllBookingsReducer;