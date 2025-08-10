import { Reducer } from "redux";
import { IErrorActionData } from "../models/error";
import { IGetAllTheatresSuccessActionData, ITheatre } from "../models/getAllTheatres";
import { GetAllTheatres, GetAllTheatresActionTypes } from "../actions/getAllTheatres";

export interface IGetAllTheatresState {
  data: IGetAllTheatresSuccessActionData;
  isSuccess: boolean;
  isLoading: boolean;
  error?: IErrorActionData;
}

const initialGetAllTheatresState: IGetAllTheatresState = {
  data: {} as IGetAllTheatresSuccessActionData,
  isSuccess: false,
  isLoading: false,
  error: undefined,
};

const GetAllTheatresReducer: Reducer<IGetAllTheatresState, GetAllTheatres> = (
  state = initialGetAllTheatresState,
  action: GetAllTheatres
) => {
  switch (action.type) {
    case GetAllTheatresActionTypes.GET_ALL_THEATRES:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        error: undefined,
      };

    case GetAllTheatresActionTypes.GET_ALL_THEATRES_SUCCESS:
      return {
        ...state,
        data: { theatres: action.payload.theatres, success: true },
        isSuccess: true,
        isLoading: false,
        error: undefined,
      };

    case GetAllTheatresActionTypes.GET_ALL_THEATRES_FAILURE:
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

    case GetAllTheatresActionTypes.GET_ALL_THEATRES_RESET:
      return initialGetAllTheatresState;

    default:
      return state;
  }
};

export default GetAllTheatresReducer;