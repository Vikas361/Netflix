import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movie, topRatedMovie, topRatedMovieList } from '../model/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor() {}

  http: HttpClient = inject(HttpClient);

  MovieList: movie[] = [];
  MovieList2: topRatedMovie[] = [];

  APIURL = 'https://netflix-15495-default-rtdb.firebaseio.com/';

  getTrendingMovies(): Observable<{ (name: string): movie }> {
    return this.http.get<{ (name: string): movie }>(
      this.APIURL + 'TrendingMovies.json'
    );
  }

  URL = 'https://api.themoviedb.org/3/movie/';

  topRatedMovies(): Observable<{ (name: string): topRatedMovieList }> {
    return this.http.get<{ (name: string): topRatedMovieList }>(
      this.APIURL + 'topRatedMovies.json'
    );
  }

  getLatestMovies() {
    return this.http.get(this.APIURL + 'LatestMovies.json');
  }

  postData(movie:any) {
    return this.http.post(this.APIURL + 'TrendingMovies.json', movie);
  }

  
}
