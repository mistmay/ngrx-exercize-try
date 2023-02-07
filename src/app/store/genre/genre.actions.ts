import { createAction, props } from "@ngrx/store";
import { Genre } from "src/app/models/genre";

export const addGenre = createAction(
    '[Genre] Add Genre',
    props<{ payload: Genre }>()
);

export const fetchGenres = createAction(
    '[Genre] Fetch Genres'
);

export const setGenres = createAction(
    '[Genre] Set Genres',
    props<{ payload: Genre[] }>()
);

export const fetchErrorGenre = createAction(
    '[Genre] Fetch Error Genre',
    props<{ payload: string }>()
);