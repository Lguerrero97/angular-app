import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, IUserRegister } from 'src/app/models/users.interface';
import { EncryptService } from 'src/app/services/encrypt.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-products',
  templateUrl: './login-products.component.html',
  styleUrls: ['./login-products.component.css']
})
export class LoginProductsComponent implements OnInit {
  form: FormGroup;
  formRegister: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private cryptoService: EncryptService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const usuarioDemo: IUserRegister = {
      id: Math.random(),
      username: 'admin',
      password: this.cryptoService.encrypt('1234'),
      email: 'luisrolandoguerrero97@gmail.com'
    };
    const existing = localStorage.getItem('userData');
    let users: IUserRegister[] = [];
    if (existing) {
      users = JSON.parse(existing);
      const exists = users.some(u => u.username === usuarioDemo.username);
      if (!exists) {
        users.push(usuarioDemo);
      }
    } else {
      users = [usuarioDemo];
    }
    localStorage.setItem('userData', JSON.stringify(users));
  }

  registerUser() {
    if (this.formRegister.valid) {
      const newUser: IUserRegister = {
        id: Math.random(),
        email: this.formRegister.get('email')?.value,
        password: this.cryptoService.encrypt(this.formRegister.get('password')?.value),
        username: this.formRegister.get('username')?.value
      }
      const userData = localStorage.getItem('userData');
      let users: IUserRegister[] = [];
      users = userData ? JSON.parse(userData) : [];
      const existUser = users.findIndex(res => res.username === newUser.username || res.email === newUser.email);
      if (existUser >= 0) {
        this.showMsg(false, 'El usuario o correo ya se encuentran en registrados');
      } else {
        users.push(newUser);
        localStorage.setItem('userData', JSON.stringify(users));
        this.formRegister.reset();
        this.showMsg(true, 'Registro Exitoso');
      }
    }
  }

  showMsg(success: boolean, msj: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    if (success) {
      Toast.fire({
        icon: "success",
        title: msj
      });
    } else {
      Toast.fire({
        icon: "warning",
        title: msj
      });
    }
  }

  login(callback?: () => void) {
    if (this.form.valid) {
      const userData = localStorage.getItem('userData');
      let users: IUserRegister[] = [];
    users = userData ? JSON.parse(userData) : [];
      const existUser = users.find(res => res.username === this.form.get('username')?.value || res.password === this.form.get('password')?.value);
       if (existUser) {
        const decryptedPassword = this.cryptoService.decrypt(existUser.password);
        if (decryptedPassword === this.form.get('password')?.value) {
          this.showMsg(true, 'EXITO');
          localStorage.setItem('activeUser', JSON.stringify(existUser));
          if (callback) {
            callback();
          }
          this.router.navigate(['/crud-products']);
        } else {
          this.showMsg(false, 'Contraseña incorrecta');
        }
      } else {
        this.showMsg(false, 'Usuario no encontrado');
      }
    }
  }

  onLogin() {
    this.login(() => {
      this.router.navigate(['/crud-products']);
    });
  }
}
