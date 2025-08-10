import { Reducer } from "redux";
import { IErrorActionData } from "../models/error";
import { ICreateBookingSuccessActionData } from "../models/createBooking";
import {
  CreateBooking,
  CreateBookingActionTypes,
} from "../actions/createBooking";

export interface ICreateBookingState {
  data: ICreateBookingSuccessActionData;
  isSuccess: boolean;
  isLoading: boolean;
  error?: IErrorActionData;
}

const initialCreateBookingState: ICreateBookingState = {
  data: {} as ICreateBookingSuccessActionData,
  isSuccess: false,
  isLoading: false,
  error: undefined,
};

const CreateBookingReducer: Reducer<ICreateBookingState, CreateBooking> = (
  state = initialCreateBookingState,
  action: CreateBooking
) => {
  switch (action.type) {
    case CreateBookingActionTypes.CREATE_BOOKING:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        error: undefined,
      };

    case CreateBookingActionTypes.CREATE_BOOKING_SUCCESS:
      console.log("Action received: CREATE_BOOKING_SUCCESS", action.payload);
      return {
        ...state,
        data: action.payload,
        isSuccess: true,
        isLoading: false,
        error: undefined,
      };

    case CreateBookingActionTypes.CREATE_BOOKING_FAILURE:
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

    case CreateBookingActionTypes.CREATE_BOOKING_RESET:
      return initialCreateBookingState;

    default:
      return state;
  }
};

export default CreateBookingReducer;
