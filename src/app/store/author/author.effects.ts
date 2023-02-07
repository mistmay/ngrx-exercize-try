import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs/operators";
import { ApiService } from "src/app/api/api.service";
import { Author } from "src/app/models/author";
import * as AuthorActions from './author.actions';

@Injectable()
export class AuthorEffects {
    addAuthor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthorActions.addAuthor),
            switchMap((data) => {
                return this.api.addAuthor(data.payload).pipe(
                    map(() => {
                        return AuthorActions.fetchAuthors();
                    })
                );
            })
        );
    });

    fetchAuthors$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthorActions.fetchAuthors),
            switchMap(() => {
                return this.api.getAllAuthors().pipe(
                    map((authors: Author[]) => {
                        return authors.map((author: Author) => {
                            return {
                                ...author
                            };
                        });
                    }),
                    map((authors: Author[]) => {
                        return AuthorActions.setAuthors({ payload: authors });
                    })
                );
            })
        );
    });

    constructor(private actions$: Actions, private api: ApiService) { }
}