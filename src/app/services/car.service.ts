import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car } from '../model/car';
import { CarFilter } from '../model/car-filter';
import { cars } from '../model/cars';

@Injectable()
export class CarService {
  // Simulating an HTTP call
  public findCars(carFilter: CarFilter): Observable<Car[]> {
    console.log(
      'Fetching cars...',
      carFilter.name,
      carFilter.brand,
      carFilter.color
    );

    return of(
      cars.filter((car) => {
        return (
          (carFilter.name
            ? car.name.toLowerCase().includes(carFilter.name.toLowerCase())
            : true) &&
          (carFilter.brand ? car.brand === carFilter.brand : true) &&
          (carFilter.color ? car.color === carFilter.color : true)
        );
      })
    );
  }
}
