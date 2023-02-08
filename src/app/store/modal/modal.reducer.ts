import { createReducer, on } from "@ngrx/store";
import { Book } from "src/app/models/book";
import { Form } from "src/app/models/form";
import * as ModalActions from './modal.actions';

export interface ModalState {
    showModal: boolean;
    formType: Form;
    isUpdate: boolean;
    bookToUpdate: Book | undefined;
}

const modalInitialState: ModalState = {
    showModal: false,
    formType: 'author',
    isUpdate: false,
    bookToUpdate: undefined
};

export const modalReducer = createReducer(
    modalInitialState,
    on(ModalActions.openModal, (state: ModalState, action: { payload: Form }) => {
        return {
            ...state,
            formType: action.payload,
            showModal: true
        };
    }),
    on(ModalActions.closeModal, (state: ModalState) => {
        return {
            ...state,
            showModal: false,
            isUpdate: false,
            bookToUpdate: undefined
        };
    }),
    on(ModalActions.setUpdateForm, (state: ModalState, action: { payload: { book: Book, formType: Form } }) => {
        return {
            ...state,
            isUpdate: true,
            showModal: true,
            bookToUpdate: action.payload.book,
            formType: action.payload.formType
        };
    })
);