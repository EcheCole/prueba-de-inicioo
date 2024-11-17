import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';  // Asegúrate de importar el componente correcto
import { EditTaskComponent } from './edit-task/edit-task.component';  // Asegúrate de importar el componente correcto
import { LoginComponent } from './login/login.component';  // Asegúrate de importar el componente correcto
import { SignupComponent } from './signup/signup.component';  // Asegúrate de importar el componente correcto

const routes: Routes = [
  { path: '', component: LoginComponent },  // Ruta por defecto para la página de login
  { path: 'home', component: TaskListComponent },  // Ruta para la página de tareas
  { path: 'edit-task/:id', component: EditTaskComponent },  // Ruta para editar una tarea
  { path: 'signup', component: SignupComponent },  // Ruta para la página de registro
  // Puedes agregar más rutas según sea necesario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura las rutas en el enrutador
  exports: [RouterModule]
})
export class AppRoutingModule { }
