import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Asegúrate de tener un servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Suponiendo que la respuesta es un token o algún dato de usuario
        if (response.success) {
          localStorage.setItem('token', response.token);  // Guardamos el token
          this.router.navigate(['/home']);  // Redirigimos al home
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      },
      error => {
        this.errorMessage = 'Error en la conexión, inténtalo más tarde';
      }
    );
  }
}
