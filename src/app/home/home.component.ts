import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { MovieService } from '../service/movie.service';
import { movie, topRatedMovie, topRatedMovieList } from '../model/movie';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  movieService: MovieService = inject(MovieService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getTopRatedMovieList();
    this.getLatestMovies();
    this.onResize();
  }
  width = document.body.offsetWidth;
  showFullImg = true;
  @HostListener('window:resize')
  onResize() {
    this.width = document.body.offsetWidth;
    console.log('width', this.width);
    if (this.width <= 500) {
      this.showFullImg = false;
    } else {
      this.showFullImg = true;
    }
  }

  // @HostListener('class.movie-list')
  // scroll() {
  //   console.log('scrolling above the movie list div');
  // }

  trendingMoviesList: movie[] = [];

  getTrendingMovies() {
    this.movieService.getTrendingMovies().subscribe((res: any) => {
      console.log(res, 'getTrendingMovie list');
      for (let key in res) {
        this.trendingMoviesList.push(res[key]);
      }
      console.log('this.treanding movies', this.trendingMoviesList);
    });
  }

  topRatedMovie: topRatedMovie[] = [];
  imgPrefix: string = 'https://image.tmdb.org/t/p/w185';

  getTopRatedMovieList() {
    this.movieService.topRatedMovies().subscribe((res: any) => {
      for (let key in res) {
        this.topRatedMovie = res[key].results;
      }
    });
    console.log('top rated movie is:', this.topRatedMovie);
  }

  latestMovies: topRatedMovie[] = [];
  getLatestMovies() {
    this.movieService.getLatestMovies().subscribe((res: any) => {
      for (let key in res) {
        this.latestMovies = res[key].results;
      }
    });
    console.log('latest movies0', this.latestMovies);
  }

  movieDetail(movie: movie, index: number, movieType: string) {
    this.movieService.MovieList = [];
    this.movieService.MovieList.push(movie);
    this.router.navigate(['movie', index, 'type', movieType]);
  }

  movieDetail2(movie: topRatedMovie, index: number, movieType: string) {
    this.movieService.MovieList2 = [];
    this.movieService.MovieList2.push(movie);
    this.router.navigate(['movie', index, 'type', movieType]);
  }

  postDataToFireBase() {
    for (let movie of this.movie1) {
      this.movieService.postData(movie).subscribe();
    }
  }

  movie1 = [];
}
