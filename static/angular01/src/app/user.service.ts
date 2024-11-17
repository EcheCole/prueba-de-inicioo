import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/signup';  // Ruta al endpoint de Flask para registrar un usuario

  constructor(private http: HttpClient) { }

  signup(username: string, email: string, password: string): Observable<any> {
    const user = { username, email, password };
    return this.http.post<any>(this.apiUrl, user);
  }
}
