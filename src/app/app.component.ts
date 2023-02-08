import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as fromApp from './store/app.reducer'
import * as fromModal from './store/modal/modal.reducer';
import * as BookActions from './store/book/book.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showModal$!: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.showModal$ = this.store.select('modal').pipe(
      map((modalState: fromModal.ModalState) => {
        return modalState.showModal;
      })
    );
    this.store.dispatch(BookActions.fetchBooks());
  }

}
