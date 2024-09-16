import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { movie, topRatedMovie } from '../model/movie';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  movieService: MovieService = inject(MovieService);
  sanitizer: DomSanitizer = inject(DomSanitizer);
  movieId: number | null = null;
  movieType: string = '';
  movieList: movie[] = [];
  movieList2: topRatedMovie[] = [];
  trailer?: SafeResourceUrl;
  bgImage = '';

  ngOnInit(): void {
    this.movieId = this.activeRoute.snapshot.params['id'];
    this.movieType = this.activeRoute.snapshot.params['type'];
    if (this.movieType === 'TrendingMovies') {
      this.movieList = this.movieService.MovieList;
      this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.movieList[0].Trailer +
          '?autoplay=1&showinfo=0&controls=0&mute=1&rel=0'
      );
      this.bgImage = this.movieList[0].Image;
    } else {
      this.movieList2 = this.movieService.MovieList2;
      this.bgImage =
        'https://assets.nflxext.com/ffe/siteui/vlv3/85ff76db-39e5-423a-afbc-97d3e74db71b/null/IN-en-20240909-TRIFECTA-perspective_b22117e0-4610-4d57-a695-20f77d241a4a_large.jpg';
    }
  }
}
