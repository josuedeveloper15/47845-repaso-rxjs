import { Injectable } from '@angular/core';
import { Observable, delay, interval, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
}
export interface Country {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getCounter(): Observable<number> {
    return interval(1000);
  }

  getColors(): Observable<string[]> {
    return of(['Azul', 'Amarillo', 'Naranja']).pipe(delay(5000));
  }
  getCountries(): Observable<Country[]> {
    return of([
      {
        id: 1,
        name: 'Mexico',
      },
      {
        id: 2,
        name: 'Peru',
      },
    ]).pipe(delay(2000));
  }

  getUsers(): Observable<User[]> {
    return new Observable((subscriber) => {
      subscriber.next([
        {
          id: 1,
          name: 'Goku',
        },
        {
          id: 2,
          name: 'Piccolo',
        },
      ]);
      subscriber.complete();
    });
  }
}
