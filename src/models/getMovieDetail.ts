export interface IGetMovieDetailSuccessActionData {
  movie: IMovieDetail;
  movieId: string;
  success: boolean;
}

export interface IMovieDetail {
  id: number;
  name: string;
  image_url: string;
  language: string;
  description: string;
  rating: string;
  genre: string;
  duration: string;
  year: string;
}
