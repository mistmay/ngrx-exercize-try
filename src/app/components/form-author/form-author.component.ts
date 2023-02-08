import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as AuthorActions from '../../store/author/author.actions';
import * as fromAuthor from '../../store/author/author.reducer';

@Component({
  selector: 'app-form-author',
  templateUrl: './form-author.component.html',
  styleUrls: ['./form-author.component.scss']
})
export class FormAuthorComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  error$!: Observable<string | undefined>;

  constructor(private fb: FormBuilder, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.error$ = this.store.select('author').pipe(
      map((authorState: fromAuthor.AuthorState) => {
        return authorState.error;
      })
    );
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  addAuthor(): void {
    this.store.dispatch(AuthorActions.addAuthor({ payload: { ...this.form.value } }));
  }

}
