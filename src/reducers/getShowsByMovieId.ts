import { IErrorActionData } from "../models/error";
import { Reducer } from "redux";
import { IGetShowsByMovieIdSuccessActionData } from "../models/getShowsByMovieId";
import {
  GetShowsByMovieId,
  GetShowsByMovieIdActionTypes,
} from "../actions/getShowsByMovieId";

export interface IGetShowsByMovieIdState {
  data: IGetShowsByMovieIdSuccessActionData;
  isSuccess: boolean;
  isLoading: boolean;
  error?: IErrorActionData;
}

const initialGetShowsByMovieIdState: IGetShowsByMovieIdState = {
  data: {} as IGetShowsByMovieIdSuccessActionData,
  isSuccess: false,
  isLoading: false,
  error: undefined,
};

const GetShowsByMovieIdReducer: Reducer<
  IGetShowsByMovieIdState,
  GetShowsByMovieId
> = (state = initialGetShowsByMovieIdState, action: GetShowsByMovieId) => {
  switch (action.type) {
    case GetShowsByMovieIdActionTypes.GET_SHOWS_BY_MOVIE_ID:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        error: undefined,
      };

    case GetShowsByMovieIdActionTypes.GET_SHOWS_BY_MOVIE_ID_SUCCESS:
      return {
        ...state,
        data: { shows: action.payload.shows, success: true },
        isSuccess: true,
        isLoading: false,
        error: undefined,
      };

    case GetShowsByMovieIdActionTypes.GET_SHOWS_BY_MOVIE_ID_FAILURE:
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

    case GetShowsByMovieIdActionTypes.GET_SHOWS_BY_MOVIE_ID_RESET:
      return initialGetShowsByMovieIdState;

    default:
      return state;
  }
};

export default GetShowsByMovieIdReducer;
