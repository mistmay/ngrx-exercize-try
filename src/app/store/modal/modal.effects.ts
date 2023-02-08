import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import * as ModalActions from './modal.actions';

@Injectable()
export class GenreEffects {
    setUpdateForm$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ModalActions.setUpdateForm),
            map(() => {
                return ModalActions.openModal({ payload: 'book' });
            })
        );
    });

    constructor(private actions$: Actions) { }
}