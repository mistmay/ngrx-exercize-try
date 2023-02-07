import { Action, createAction, props } from "@ngrx/store";
import { Book } from "src/app/models/book";

export const addBook = createAction(
    '[Book] Add Book',
    props<{ payload: Book }>()
);

export const updateBook = createAction(
    '[Book] Update Book',
    props<{ payload: { id: number, book: Book } }>()
);

export const deleteBook = createAction(
    '[Book] Delete Book',
    props<{ payload: number }>()
);

export const fetchBooks = createAction(
    '[Book] Fetch Books'
);

export const setBooks = createAction(
    '[Book] Set Books',
    props<{ payload: Book[] }>()
);

export const fetchErrorBook = createAction(
    '[Book] Fetch Error Book',
    props<{ payload: string }>()
);