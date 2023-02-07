import * as fromBook from './book/book.reducer';
import * as fromAuthor from './author/author.reducer';
import * as fromGenre from './genre/genre.reducer';
import * as fromModal from './modal/modal.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    book: fromBook.BookState;
    author: fromAuthor.AuthorState;
    genre: fromGenre.GenreState;
    modal: fromModal.ModalState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
    book: fromBook.bookReducer,
    author: fromAuthor.authorReducer,
    genre: fromGenre.genreReducer,
    modal: fromModal.modalReducer
};