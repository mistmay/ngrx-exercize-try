import { createReducer, on } from "@ngrx/store";
import { Genre } from "src/app/models/genre";
import * as GenreActions from './genre.actions';

export interface GenreState {
    genres: Genre[];
    error: string | undefined;
    status: string;
}

const genreInitialState: GenreState = {
    genres: [],
    error: undefined,
    status: 'loading'
};

export const genreReducer = createReducer(
    genreInitialState,
    on(GenreActions.addGenre, (state: GenreState, action: { payload: Genre }) => {
        return {
            ...state,
            genres: [...state.genres, action.payload],
            status: 'loading'
        };
    }),
    on(GenreActions.fetchGenres, (state: GenreState) => {
        return {
            ...state,
            status: 'loading'
        }
    }),
    on(GenreActions.setGenres, (state: GenreState, action: { payload: Genre[] }) => {
        return {
            ...state,
            genres: [...action.payload],
            error: undefined,
            status: 'ok'
        };
    }),
    on(GenreActions.fetchErrorGenre, (state: GenreState, action: { payload: string }) => {
        return {
            ...state,
            error: action.payload,
            status: "ko"
        };
    })
);