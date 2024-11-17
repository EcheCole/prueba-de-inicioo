import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/api/tasks';  // Dirección del backend Flask

  constructor(private http: HttpClient) { }

  // Obtener todas las tareas del usuario
  getTasks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Crear una nueva tarea
  addTask(title: string, description: string): Observable<any> {
    const task = { title, description };
    return this.http.post<any>(this.apiUrl, task);
  }

  // Editar una tarea existente
  editTask(taskId: number, title: string, description: string): Observable<any> {
    const task = { title, description };
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, task);
  }

  // Eliminar una tarea
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }
}
