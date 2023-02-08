import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from 'rxjs';
import { ApiService } from "src/app/api/api.service";
import { Genre } from "src/app/models/genre";
import * as GenreActions from './genre.actions';
import * as ModalActions from '../modal/modal.actions';
import * as fromApp from '../app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class GenreEffects {
    addGenre$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GenreActions.addGenre),
            switchMap((data) => {
                return this.api.addGenre(data.payload).pipe(
                    map(() => {
                        this.store.dispatch(ModalActions.closeModal());
                        return GenreActions.fetchGenres();
                    }),
                    catchError((error) => {
                        return of(GenreActions.fetchErrorGenre({ payload: error.message }));
                    })
                );
            })
        );
    });

    fetchGenres$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GenreActions.fetchGenres),
            switchMap(() => {
                return this.api.getAllGenres().pipe(
                    map((genres: Genre[]) => {
                        return GenreActions.setGenres({ payload: genres });
                    }),
                    catchError((error) => {
                        return of(GenreActions.fetchErrorGenre({ payload: error.message }));
                    })
                );
            })
        );
    });

    constructor(private actions$: Actions, private api: ApiService, private store: Store<fromApp.AppState>) { }
}