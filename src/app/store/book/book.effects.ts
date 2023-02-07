import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ApiService } from "src/app/api/api.service";
import { Book } from "src/app/models/book";
import * as BookActions from './book.actions';

@Injectable()
export class BookEffects {
    addBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookActions.addBook),
            switchMap((data) => {
                return this.api.addBook(data.payload).pipe(
                    map(() => {
                        return BookActions.fetchBooks();
                    }),
                    catchError((error) => {
                        return of(BookActions.fetchErrorBook({ payload: error }));
                    })
                );
            })
        );
    });

    updateBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookActions.updateBook),
            switchMap((data) => {
                return this.api.updateBook(data.payload.id, data.payload.book).pipe(
                    map(() => {
                        return BookActions.fetchBooks();
                    }),
                    catchError((error) => {
                        return of(BookActions.fetchErrorBook({ payload: error }));
                    })
                );
            })
        );
    });

    deleteBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookActions.deleteBook),
            switchMap((data) => {
                return this.api.removeBook(data.payload).pipe(
                    map(() => {
                        return BookActions.fetchBooks();
                    }),
                    catchError((error) => {
                        return of(BookActions.fetchErrorBook({ payload: error }));
                    })
                );
            })
        );
    });

    fetchBooks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookActions.fetchBooks),
            switchMap(() => {
                return this.api.getAllBooks().pipe(
                    map((books: Book[]) => {
                        return books.map((book: Book) => {
                            return {
                                ...book,
                                genres: book.genres ? book.genres : []
                            };
                        });
                    }),
                    map((books: Book[]) => {
                        return BookActions.setBooks({ payload: books });
                    }),
                    catchError((error) => {
                        return of(BookActions.fetchErrorBook({ payload: error }));
                    })
                );
            })
        );
    });

    constructor(private actions$: Actions, private api: ApiService) { }
}