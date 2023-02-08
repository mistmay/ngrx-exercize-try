import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthorEffects } from './store/author/author.effects';
import { BookEffects } from './store/book/book.effects';
import { GenreEffects } from './store/genre/genre.effects';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ModalComponent } from './core/modal/modal.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { TableComponent } from './components/table/table.component';
import { FormAuthorComponent } from './components/form-author/form-author.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGenreComponent } from './components/form-genre/form-genre.component';
import { FormBookComponent } from './components/form-book/form-book.component';
import { ModalEffects } from './store/modal/modal.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalComponent,
    MainPageComponent,
    TableComponent,
    FormAuthorComponent,
    FormGenreComponent,
    FormBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthorEffects, BookEffects, GenreEffects, ModalEffects]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
