export interface IGetAllTheatresSuccessActionData {
  theatres: ITheatre[];
  success: boolean;
}

export interface ITheatre {
  id: number;
  name: string;
  image_url: string;
  address: string;
}
