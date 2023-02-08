import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as ModalActions from './modal.actions';
import * as GenreActions from '../genre/genre.actions';
import * as BookActions from '../book/book.actions';
import * as AuthorActions from '../author/author.actions';
import * as fromApp from '../app.reducer';
import { map } from "rxjs/operators";

@Injectable()
export class ModalEffects {
    closeModal$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ModalActions.closeModal),
            map(() => {
                this.store.dispatch(BookActions.resetError());
                this.store.dispatch(AuthorActions.resetError());
                this.store.dispatch(GenreActions.resetError());
                return BookActions.fetchBooks();
            })
        );
    });

    constructor(private actions$: Actions, private store: Store<fromApp.AppState>) { }
}