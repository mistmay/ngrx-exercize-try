import { createReducer, on } from "@ngrx/store";
import { Author } from "src/app/models/author";
import * as AuthorActions from './author.actions';

export interface AuthorState {
    authors: Author[];
    error: string | undefined;
    status: string;
}

const authorInitialState: AuthorState = {
    authors: [],
    error: undefined,
    status: 'loading'
};

export const authorReducer = createReducer(
    authorInitialState,
    on(AuthorActions.addAuthor, (state: AuthorState, action: { payload: Author }) => {
        return {
            ...state,
            authors: [...state.authors, action.payload],
            status: 'loading'
        };
    }),
    on(AuthorActions.fetchAuthors, (state: AuthorState) => {
        return {
            ...state,
            status: 'loading'
        }
    }),
    on(AuthorActions.setAuthors, (state: AuthorState, action: { payload: Author[] }) => {
        return {
            ...state,
            authors: [...action.payload],
            error: undefined,
            status: 'ok'
        };
    }),
    on(AuthorActions.fetchErrorAuthor, (state: AuthorState, action: { payload: string }) => {
        return {
            ...state,
            error: action.payload,
            status: "ko"
        };
    })
);