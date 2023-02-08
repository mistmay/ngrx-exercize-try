import { createReducer, on } from "@ngrx/store";
import { Genre } from "src/app/models/genre";
import * as GenreActions from './genre.actions';

export interface GenreState {
    genres: Genre[];
    error: string | undefined;
    isLoading: boolean;
}

const genreInitialState: GenreState = {
    genres: [],
    error: undefined,
    isLoading: true
};

export const genreReducer = createReducer(
    genreInitialState,
    on(GenreActions.addGenre, (state: GenreState, action: { payload: Genre }) => {
        return {
            ...state,
            genres: [...state.genres, action.payload],
            isLoading: true,
            error: undefined
        };
    }),
    on(GenreActions.fetchGenres, (state: GenreState) => {
        return {
            ...state,
            isLoading: true,
            error: undefined
        }
    }),
    on(GenreActions.setGenres, (state: GenreState, action: { payload: Genre[] }) => {
        return {
            ...state,
            genres: [...action.payload],
            error: undefined,
            isLoading: false
        };
    }),
    on(GenreActions.fetchErrorGenre, (state: GenreState, action: { payload: string }) => {
        return {
            ...state,
            error: action.payload,
            isLoading: false
        };
    })
);