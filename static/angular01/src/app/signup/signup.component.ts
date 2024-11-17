import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';  // Importamos el servicio de usuarios
import { Router } from '@angular/router';  // Para redirigir después del registro

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Llamamos al servicio de usuario para registrar al nuevo usuario
    this.userService.signup(this.username, this.email, this.password).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = 'Cuenta creada con éxito. Inicia sesión.';
          this.router.navigate(['/login']);  // Redirige a la página de login
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.errorMessage = 'Hubo un problema al registrar la cuenta. Intenta nuevamente.';
      }
    );
  }

}
