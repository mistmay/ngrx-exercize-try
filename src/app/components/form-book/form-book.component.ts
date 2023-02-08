import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { Genre } from 'src/app/models/genre';
import * as fromApp from '../../store/app.reducer';
import * as fromAuthor from '../../store/author/author.reducer';
import * as fromGenre from '../../store/genre/genre.reducer';
import * as fromModal from '../../store/modal/modal.reducer';
import * as BookActions from '../../store/book/book.actions';
import { checkboxListValidator } from 'src/app/validators/checkbox-list-validator';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.scss']
})
export class FormBookComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isUpdate!: [boolean, Book | undefined];
  authorsList!: Author[];
  genresList!: Genre[];
  subscription!: Subscription;

  constructor(private store: Store<fromApp.AppState>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscription = combineLatest([this.store.select('modal'), this.store.select('author'), this.store.select('genre')]).pipe(
      take(1)
    ).subscribe((res: [modalState: fromModal.ModalState, authorState: fromAuthor.AuthorState, genreState: fromGenre.GenreState]) => {
      console.log(res);
      this.isUpdate = [res[0].isUpdate, res[0].bookToUpdate];
      this.authorsList = [...res[1].authors];
      this.genresList = [...res[2].genres];
      const currentTitle: String = this.isUpdate[0] && this.isUpdate[1] ? this.isUpdate[1].title : '';
      const currenAuthor: String = this.isUpdate[0] && this.isUpdate[1] ? String(this.isUpdate[1].author.id) : '';
      this.form = this.fb.group({
        title: [currentTitle, Validators.compose([Validators.required, Validators.minLength(3)])],
        author: [currenAuthor, Validators.required],
        genres: this.fb.array([], Validators.compose([Validators.required, checkboxListValidator()]))
      });
      this.genresList.forEach((genre: Genre) => {
        if (this.isUpdate[0] && this.isUpdate[1]) {
          this.addGenre(this.checkToCheck(genre));
        } else {
          this.addGenre(false);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.form.reset();
    this.subscription.unsubscribe();
  }

  get genres(): FormArray {
    return this.form.controls['genres'] as FormArray;
  }

  addGenre(isChecked: boolean): void {
    this.genres.push(new FormControl(isChecked));
  }

  checkToCheck(genre: Genre): boolean {
    if (this.isUpdate[0] && this.isUpdate[1]) {
      return !!this.isUpdate[1].genres.find((current: Genre) => current.id === genre.id);
    } else {
      return false;
    }
  }

  addBook(): void {
    const currentGenres: Genre[] = [];
    this.form.value.genres.forEach((element: FormControl, index: number) => {
      if (element) {
        currentGenres.push(this.genresList[index]);
      }
    });
    const currentAuthor: Author | undefined = this.authorsList.find((author: Author) => author.id === Number(this.form.value.author));
    if (currentAuthor) {
      const definitiveAuthor: Author = currentAuthor;
      const book: Book = { title: this.form.value.title, author: definitiveAuthor, genres: currentGenres };
      if (this.isUpdate[0] && this.isUpdate[1] && this.isUpdate[1].id) {
        this.store.dispatch(BookActions.updateBook({ payload: { id: this.isUpdate[1].id, book: { ...book } } }));
      } else {
        this.store.dispatch(BookActions.addBook({ payload: { ...book } }));
      }
    }
  }

}
