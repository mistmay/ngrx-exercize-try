import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as fromGenre from '../../store/genre/genre.reducer';
import * as GenreActions from '../../store/genre/genre.actions';

@Component({
  selector: 'app-form-genre',
  templateUrl: './form-genre.component.html',
  styleUrls: ['./form-genre.component.scss']
})
export class FormGenreComponent {
  form!: FormGroup;
  error$!: Observable<string | undefined>;

  constructor(private fb: FormBuilder, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.error$ = this.store.select('genre').pipe(
      map((genreState: fromGenre.GenreState) => {
        return genreState.error;
      })
    );
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  addGenre(): void {
    this.store.dispatch(GenreActions.addGenre({ payload: { ...this.form.value } }));
  }

}
