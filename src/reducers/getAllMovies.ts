import { Reducer } from "redux";
import { IErrorActionData } from "../models/error";
import { IGetAllMoviesSuccessActionData, IMovie } from "../models/getAllMovies";
import { GetAllMovies, GetAllMoviesActionTypes } from "../actions/getAllMovies";

export interface IGetAllMoviesState {
  data: IGetAllMoviesSuccessActionData;
  isSuccess: boolean;
  isLoading: boolean;
  error?: IErrorActionData;
}

const initialGetAllMoviesState: IGetAllMoviesState = {
  data: {} as IGetAllMoviesSuccessActionData,
  isSuccess: false,
  isLoading: false,
  error: undefined,
};

const GetAllMoviesReducer: Reducer<IGetAllMoviesState, GetAllMovies> = (
  state = initialGetAllMoviesState,
  action: GetAllMovies
) => {
  switch (action.type) {
    case GetAllMoviesActionTypes.GET_ALL_MOVIES:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        error: undefined,
      };

    case GetAllMoviesActionTypes.GET_ALL_MOVIES_SUCCESS:
      return {
        ...state,
        data: { movies: action.payload.movies, success: true },
        isSuccess: true,
        isLoading: false,
        error: undefined,
      };

    case GetAllMoviesActionTypes.GET_ALL_MOVIES_FAILURE:
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

    case GetAllMoviesActionTypes.GET_ALL_MOVIES_RESET:
      return initialGetAllMoviesState;

    default:
      return state;
  }
};

export default GetAllMoviesReducer;
