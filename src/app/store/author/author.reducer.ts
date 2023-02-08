import { createReducer, on } from "@ngrx/store";
import { Author } from "src/app/models/author";
import * as AuthorActions from './author.actions';

export interface AuthorState {
    authors: Author[];
    error: string | undefined;
    isLoading: boolean;
}

const authorInitialState: AuthorState = {
    authors: [],
    error: undefined,
    isLoading: true
};

export const authorReducer = createReducer(
    authorInitialState,
    on(AuthorActions.addAuthor, (state: AuthorState, action: { payload: Author }) => {
        return {
            ...state,
            authors: [...state.authors, action.payload],
            isLoading: true,
            error: undefined
        };
    }),
    on(AuthorActions.fetchAuthors, (state: AuthorState) => {
        return {
            ...state,
            isLoading: true,
            error: undefined
        };
    }),
    on(AuthorActions.setAuthors, (state: AuthorState, action: { payload: Author[] }) => {
        return {
            ...state,
            authors: [...action.payload],
            error: undefined,
            isLoading: false
        };
    }),
    on(AuthorActions.fetchErrorAuthor, (state: AuthorState, action: { payload: string }) => {
        return {
            ...state,
            error: action.payload,
            isLoading: false
        };
    }),
    on(AuthorActions.resetError, (state: AuthorState) => {
        return {
            ...state,
            error: undefined
        };
    })
);