import { Component, OnDestroy } from '@angular/core';
import { User, UsersService } from './users.service';
import {
  Observable,
  Subscription,
  filter,
  first,
  forkJoin,
  interval,
  map,
  take,
} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  // users: User[] = [];
  users$: Observable<User[]>;
  counter = 0;

  loading = false;

  // counterSubscription: Subscription;

  // interval$ = interval()

  constructor(private usersService: UsersService) {
    this.users$ = this.usersService.getUsers();

    this.usersService
      .getCounter()
      .pipe(
        // first(),
        take(10),
        map((v) => v * 2),
        filter((v) => v > 6)
      )
      .subscribe({
        next: (v) => {
          this.counter = v;
        },
      });

    this.loading = true;
    // this.usersService.getCountries().subscribe({
    //   next: (v) => {
    //     console.log('SE CARGARON LOS PAISES');
    //     this.loading = false;
    //   },
    // });
    // this.usersService.getColors().subscribe({
    //   next: (v) => {
    //     console.log('SER CARGARON LOS COLORES');
    //     this.loading = false;
    //   },
    // });

    forkJoin([
      this.usersService.getCountries(),
      this.usersService.getColors(),
    ]).subscribe({
      next: (v) => {
        console.log('RESULTADO PAISES: ', v[0]);
        console.log('RESULTADO COLORES: ', v[1]);
      },
      complete: () => {
        this.loading = false;
      },
      error: () => {},
    });

    // this.usersService.getUsers().subscribe({
    //   next: (v) => {
    //     this.users = v;
    //   },
    //   error: (err) => {},
    //   complete: () => {},
    // });
  }
  // ngOnDestroy(): void {
  //   this.counterSubscription.unsubscribe();
  // }
}
