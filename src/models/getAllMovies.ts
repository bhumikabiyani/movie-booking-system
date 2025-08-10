export interface IGetAllMoviesSuccessActionData {
  movies: IMovie[];
  success: boolean;
}

export interface IMovie {
  id: number;
  name: string;
  language: string;
  image_url: string;
  description: string;
  genre: string;
  duration: string;
}
