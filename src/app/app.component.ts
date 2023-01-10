import { Component, inject } from '@angular/core';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarService } from './services/car.service';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CarFilter } from './model/car-filter';
import { Car } from './model/car';

interface PageViewModel {
  name: string;
  brand: string;
  color: string;
  results: Car[];
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, SearchFilterComponent, SearchResultsComponent],
  providers: [CarService],
  standalone: true,
})
export class AppComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly carService = inject(CarService);

  // Source
  private readonly queryParams$: Observable<CarFilter> =
    this.activatedRoute.queryParams.pipe(
      map((params: Params) => ({
        name: params.name,
        brand: params.brand,
        color: params.color,
      }))
    );

  // Intermediate
  private readonly results$: Observable<Car[]> = this.queryParams$.pipe(
    switchMap((carFilter: CarFilter) => {
      return this.carService.findCars(carFilter);
    })
  );

  // Presentation
  public readonly vm$: Observable<PageViewModel> = combineLatest([
    this.queryParams$,
    this.results$,
  ]).pipe(
    map(([params, results]) => ({
      name: params.name,
      brand: params.brand,
      color: params.color,
      results,
    }))
  );

  // We are using queryParamsHandling: 'merge', because we want to merge all query parameters
  // Let's say brand is already selected then our URL looks like this:
  // example.com?brand=ford
  // When we select a color we want to add the color (merge) to the already existing query parameters
  // example.com?brand=ford&color=red
  // If we don't set queryParamsHandling to 'merge' then the latest filter will override the previous one and will there be only one query parameter
  public filterChanged(filter: CarFilter): void {
    this.router.navigate([], {
      queryParams: filter,
      queryParamsHandling: 'merge',
    });
  }

  public clear(): void {
    this.router.navigate([]);
  }
}
