import exp from 'constants';

export interface movie {
  Name: string;
  Description: string;
  StoryLine: string;
  Image: string;
  Trailer: string;
  PhoneImage: string;
}

export interface topRatedMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface topRatedMovieList {
  page: number;
  results: topRatedMovie[];
  total_pages: number;
  total_results: number;
}
