import { createAction, props } from "@ngrx/store";
import { Author } from "src/app/models/author";

export const addAuthor = createAction(
    '[Author] Add Author',
    props<{ payload: Author }>()
);

export const fetchAuthors = createAction(
    '[Author] Fetch Authors'
);

export const setAuthors = createAction(
    '[Author] Set Authors',
    props<{ payload: Author[] }>()
);

export const fetchErrorAuthor = createAction(
    '[Author] Fetch Error Author',
    props<{ payload: string }>()
);