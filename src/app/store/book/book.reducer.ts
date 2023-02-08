import { createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/models/book';
import * as BookActions from './book.actions';

export interface BookState {
    books: Book[];
    error: string | undefined;
    isLoading: boolean;
}

const bookInitialState: BookState = {
    books: [],
    error: undefined,
    isLoading: true
};

export const bookReducer = createReducer(
    bookInitialState,
    on(BookActions.addBook, (state: BookState, action: { payload: Book }) => {
        return {
            ...state,
            books: [...state.books, action.payload],
            isLoading: true
        };
    }),
    on(BookActions.updateBook, (state: BookState, action: { payload: { id: number, book: Book } }) => {
        const updatedBooks: Book[] = [...state.books];
        const updatedBook: Book = { ...state.books[action.payload.id], ...action.payload.book };
        updatedBooks[action.payload.id] = updatedBook;
        return {
            ...state,
            books: updatedBooks,
            isLoading: true
        };
    }),
    on(BookActions.deleteBook, (state: BookState, action: { payload: number }) => {
        return {
            ...state,
            books: state.books.filter((book: Book) => book.id !== action.payload),
            isLoading: true
        };
    }),
    on(BookActions.fetchBooks, (state: BookState) => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(BookActions.setBooks, (state: BookState, action: { payload: Book[] }) => {
        return {
            ...state,
            books: [...action.payload],
            error: undefined,
            isLoading: false
        };
    }),
    on(BookActions.fetchErrorBook, (state: BookState, action: { payload: string }) => {
        return {
            ...state,
            error: action.payload,
            isLoading: false
        };
    })
);