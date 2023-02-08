import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Form } from 'src/app/models/form';
import * as fromApp from '../../store/app.reducer';
import * as ModalActions from '../../store/modal/modal.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(private store: Store<fromApp.AppState>) { }

  openForm(formType: Form) {
    this.store.dispatch(ModalActions.openModal({ payload: formType }));
  }

}
