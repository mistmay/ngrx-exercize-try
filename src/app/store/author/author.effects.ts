import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from 'rxjs';
import { ApiService } from "src/app/api/api.service";
import { Author } from "src/app/models/author";
import * as AuthorActions from './author.actions';
import * as ModalActions from '../modal/modal.actions';
import * as fromApp from '../app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthorEffects {
    addAuthor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthorActions.addAuthor),
            switchMap((data) => {
                return this.api.addAuthor(data.payload).pipe(
                    map(() => {
                        this.store.dispatch(ModalActions.closeModal());
                        return AuthorActions.fetchAuthors();
                    }),
                    catchError((error) => {
                        return of(AuthorActions.fetchErrorAuthor({ payload: error.message }));
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
                        return AuthorActions.setAuthors({ payload: authors });
                    }),
                    catchError((error) => {
                        return of(AuthorActions.fetchErrorAuthor({ payload: error.message }));
                    })
                );
            })
        );
    });

    constructor(private actions$: Actions, private api: ApiService, private store: Store<fromApp.AppState>) { }
}