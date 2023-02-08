import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import * as fromApp from '../../store/app.reducer';
import * as fromBook from '../../store/book/book.reducer';
import * as BookActions from '../../store/book/book.actions';
import * as ModalActions from '../../store/modal/modal.actions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  booksState$!: Observable<fromBook.BookState>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.booksState$ = this.store.select('book');
  }

  deleteBook(book: Book): void {
    if (book.id) {
      this.store.dispatch(BookActions.deleteBook({ payload: book.id }));
    }
  }

  updateBook(book: Book): void {
    this.store.dispatch(ModalActions.setUpdateForm({ payload: { book: book, formType: 'book' } }));
  }

}
