import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs/operators";
import { ApiService } from "src/app/api/api.service";
import { Genre } from "src/app/models/genre";
import * as GenreActions from './genre.actions';

@Injectable()
export class GenreEffects {
    addGenre$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GenreActions.addGenre),
            switchMap((data) => {
                return this.api.addGenre(data.payload).pipe(
                    map(() => {
                        return GenreActions.fetchGenres();
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
                        return genres.map((genre: Genre) => {
                            return {
                                ...genre
                            };
                        });
                    }),
                    map((genres: Genre[]) => {
                        return GenreActions.setGenres({ payload: genres });
                    })
                );
            })
        );
    });

    constructor(private actions$: Actions, private api: ApiService) { }
}