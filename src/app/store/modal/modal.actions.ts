import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/models/book";
import { Form } from "src/app/models/form";

export const openModal = createAction(
    '[Modal] Open Modal',
    props<{ payload: Form }>()
);

export const closeModal = createAction(
    '[Modal] Close Modal'
);

export const setUpdateForm = createAction(
    '[Modal] Set Update Form',
    props<{ payload: Book }>()
);