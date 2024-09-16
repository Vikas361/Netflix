import {
  Component,
  ElementRef,
  inject,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { MovieService } from '../service/movie.service';
import { topRatedMovie } from '../model/movie';
import { filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  movieService: MovieService = inject(MovieService);
  router: Router = inject(Router);
  movies1: topRatedMovie[] = [];
  movies2: topRatedMovie[] = [];
  movieList: topRatedMovie[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w185';

  ngOnInit(): void {
    this.movieService.topRatedMovies().subscribe((result: any) => {
      for (let key in result) {
        this.movies1 = result[key].results;
      }
    });
    this.movieService.getLatestMovies().subscribe((res: any) => {
      for (let key in res) {
        this.movies2 = res[key].results;
      }
    });
  }

  searchedMoviesList: topRatedMovie[] = [];
  searchMovie(movieName: HTMLInputElement) {
    this.movieList = this.movies1.concat(this.movies2);
    console.log('movie', movieName.value);
    this.searchedMoviesList = this.movieList.filter((par) =>
      par.title.toLowerCase().includes(movieName.value.toLowerCase())
    );
    console.log('searched movie list', this.searchedMoviesList);
  }

  movieDetailPage(movie: topRatedMovie, index: number, type: string) {
    this.movieService.MovieList2 = [];
    this.movieService.MovieList2.push(movie);
    this.router.navigate(['movie', index, 'type', type]);
  }
}
