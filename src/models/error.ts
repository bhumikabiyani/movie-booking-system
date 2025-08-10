export interface IErrorActionData {
    errorCode: number;
    errorMessage: string;
    callBack?: () => void;
    errorData?: any;
  }