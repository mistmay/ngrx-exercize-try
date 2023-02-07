import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Form } from 'src/app/models/form';
import * as fromApp from '../../store/app.reducer';
import * as fromModal from '../../store/modal/modal.reducer';
import * as ModalActions from '../../store/modal/modal.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef;
  form$!: Observable<Form>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.form$ = this.store.select('modal').pipe(
      map((modalState: fromModal.ModalState) => {
        return modalState.formType;
      })
    );
  }

  clickOutsideModal(event: Event): void {
    if (event.target !== this.modal.nativeElement) {
      return;
    } else {
      this.store.dispatch(ModalActions.closeModal());
    }
  }

}
