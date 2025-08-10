import { IErrorActionData } from "../models/error";
import { Reducer } from "redux";
import { IGetMovieDetailSuccessActionData } from "../models/getMovieDetail";
import { GetMovieDetail, GetMovieDetailActionTypes } from "../actions/getMovieDetail";



export interface IGetMovieDetailState {
  data: IGetMovieDetailSuccessActionData;
  isSuccess: boolean;
  isLoading: boolean;
  error?: IErrorActionData;
}

const initialGetMovieDetailState: IGetMovieDetailState = {
  data: {} as IGetMovieDetailSuccessActionData,
  isSuccess: false,
  isLoading: false,
  error: undefined,
};

const GetMovieDetailReducer: Reducer<IGetMovieDetailState, GetMovieDetail> = (
  state = initialGetMovieDetailState,
  action: GetMovieDetail
) => {
  switch (action.type) {
    case GetMovieDetailActionTypes.GET_MOVIE_DETAIL:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        error: undefined,
      };

    case GetMovieDetailActionTypes.GET_MOVIE_DETAIL_SUCCESS:
      return {
        ...state,
        data: { movie: action.payload.movie, movieId: action.payload.movieId, success: true },
        isSuccess: true,
        isLoading: false,
        error: undefined,
      };

    case GetMovieDetailActionTypes.GET_MOVIE_DETAIL_FAILURE:
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

    case GetMovieDetailActionTypes.GET_MOVIE_DETAIL_RESET:
      return initialGetMovieDetailState;

    default:
      return state;
  }
};

export default GetMovieDetailReducer;