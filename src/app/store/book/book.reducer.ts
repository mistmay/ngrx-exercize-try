import { createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/models/book';
import * as BookActions from './book.actions';

export interface BookState {
    books: Book[];
    error: string | undefined;
    status: string;
}

const bookInitialState: BookState = {
    books: [],
    error: undefined,
    status: 'loading'
};

export const bookReducer = createReducer(
    bookInitialState,
    on(BookActions.addBook, (state: BookState, action: { payload: Book }) => {
        return {
            ...state,
            books: [...state.books, action.payload],
            status: 'loading'
        };
    }),
    on(BookActions.updateBook, (state: BookState, action: { payload: { id: number, book: Book } }) => {
        const updatedBooks: Book[] = [...state.books];
        const updatedBook: Book = { ...state.books[action.payload.id], ...action.payload.book };
        updatedBooks[action.payload.id] = updatedBook;
        return {
            ...state,
            books: updatedBooks,
            status: 'loading'
        };
    }),
    on(BookActions.deleteBook, (state: BookState, action: { payload: number }) => {
        return {
            ...state,
            books: state.books.filter((book: Book) => book.id !== action.payload),
            status: 'loading'
        };
    }),
    on(BookActions.fetchBooks, (state: BookState) => {
        return {
            ...state,
            status: 'loading'
        }
    }),
    on(BookActions.setBooks, (state: BookState, action: { payload: Book[] }) => {
        return {
            ...state,
            books: [...action.payload],
            error: undefined,
            status: 'ok'
        };
    }),
    on(BookActions.fetchErrorBook, (state: BookState, action: { payload: string }) => {
        return {
            ...state,
            error: action.payload,
            status: "ko"
        };
    })
);