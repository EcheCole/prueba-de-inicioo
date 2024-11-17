import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  taskId: number;
  task = {
    title: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtén el ID de la tarea de los parámetros de la URL
    this.taskId = Number(this.route.snapshot.paramMap.get('taskId'));

    // Obtén los detalles de la tarea desde el backend
    this.getTask();
  }

  getTask(): void {
    this.taskService.getTask(this.taskId).subscribe(response => {
      if (response.success) {
        this.task = response.task;
      } else {
        console.error(response.message);
      }
    });
  }

  updateTask(): void {
    this.taskService.editTask(this.taskId, this.task.title, this.task.description)
      .subscribe(response => {
        if (response.success) {
          this.router.navigate(['/home']);
        } else {
          console.error(response.message);
        }
      });
  }
}
