import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author';
import { Book } from '../models/book';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.url}/author`);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}/book`);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.url}/genre`);
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(`${this.url}/author`, author);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.url}/book`, book);
  }

  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${this.url}/genre`, genre);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.url}/book/${id}`, book);
  }

  removeBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/book/${id}`);
  }
}
