import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();  // Cargar las tareas al inicio
  }

  // Obtener todas las tareas del usuario
  getTasks(): void {
    this.taskService.getTasks().subscribe(response => {
      if (response.success) {
        this.tasks = response.tasks;  // Asignar las tareas a la propiedad 'tasks'
      } else {
        console.error('Error al cargar tareas');
      }
    });
  }

  // Agregar una nueva tarea
  addTask(title: string, description: string): void {
    this.taskService.addTask(title, description).subscribe(response => {
      if (response.success) {
        this.getTasks();  // Recargar las tareas después de agregar
      } else {
        console.error('Error al agregar tarea');
      }
    });
  }

  // Editar una tarea existente
  editTask(taskId: number, title: string, description: string): void {
    this.taskService.editTask(taskId, title, description).subscribe(response => {
      if (response.success) {
        this.getTasks();  // Recargar las tareas después de editar
      } else {
        console.error('Error al editar tarea');
      }
    });
  }

  // Eliminar una tarea
  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(response => {
      if (response.success) {
        this.getTasks();  // Recargar las tareas después de eliminar
      } else {
        console.error('Error al eliminar tarea');
      }
    });
  }
}
