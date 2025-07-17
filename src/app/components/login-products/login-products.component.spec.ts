import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginProductsComponent } from './login-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptService } from 'src/app/services/encrypt.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('LoginProductsComponent', () => {
  let component: LoginProductsComponent;
  let fixture: ComponentFixture<LoginProductsComponent>;
  let encryptSpy: jasmine.SpyObj<EncryptService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    encryptSpy = jasmine.createSpyObj('EncryptService', ['encrypt', 'decrypt']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginProductsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: EncryptService, useValue: encryptSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    localStorage.clear(); // limpio antes de crear el componente
    fixture = TestBed.createComponent(LoginProductsComponent);
    component = fixture.componentInstance;
    // no llamamos fixture.detectChanges() aquí para evitar que ngOnInit corra automáticamente
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario de login inválido si está vacío', () => {
    component.form.setValue({ username: '', password: '' });
    expect(component.form.valid).toBeFalse();
  });

  it('formulario de registro inválido si está vacío', () => {
    component.formRegister.setValue({ username: '', email: '', password: '' });
    expect(component.formRegister.valid).toBeFalse();
  });

  it('debería crear el usuario demo en ngOnInit', () => {
    component.ngOnInit();
    const users = JSON.parse(localStorage.getItem('userData') || '[]');
    expect(users.length).toBe(1);
    expect(users[0].username).toBe('admin');
  });

  it('debería registrar un usuario si no existe', () => {
    encryptSpy.encrypt.and.returnValue('mockedEncrypt');
    spyOn(component as any, 'showMsg');

    component.ngOnInit(); // para tener el usuario demo
    component.formRegister.setValue({
      username: 'testuser',
      email: 'test@mail.com',
      password: '1234'
    });

    component.registerUser();

    const users = JSON.parse(localStorage.getItem('userData') || '[]');
    expect(users.length).toBe(2); // admin + testuser
    expect(users.some((u:any) => u.username === 'testuser')).toBeTrue();
    expect((component as any).showMsg).toHaveBeenCalledWith(true, 'Registro Exitoso');
  });

  it('no debería registrar si el usuario ya existe', () => {
    localStorage.setItem('userData', JSON.stringify([
      { id: 1, username: 'existing', email: 'exist@mail.com', password: 'encrypted' }
    ]));

    component.formRegister.setValue({
      username: 'existing',
      email: 'exist@mail.com',
      password: '1234'
    });

    spyOn(component as any, 'showMsg');
    component.registerUser();

    expect((component as any).showMsg).toHaveBeenCalledWith(false, 'El usuario o correo ya se encuentran en registrados');
  });

  it('debería hacer login correctamente con usuario y contraseña válidos', () => {
    encryptSpy.decrypt.and.returnValue('1234');
    localStorage.setItem('userData', JSON.stringify([
      { id: 1, username: 'admin', password: 'mockedEncrypted', email: 'admin@mail.com' }
    ]));

    component.form.setValue({ username: 'admin', password: '1234' });
    spyOn(component as any, 'showMsg');

    component.login();

    const user = JSON.parse(localStorage.getItem('activeUser')!);
    expect(user.username).toBe('admin');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/crud-products']);
    expect((component as any).showMsg).toHaveBeenCalledWith(true, 'EXITO');
  });

  it('debería fallar login si la contraseña es incorrecta', () => {
    encryptSpy.decrypt.and.returnValue('wrongpassword');
    localStorage.setItem('userData', JSON.stringify([
      { id: 1, username: 'admin', password: 'mockedEncrypted', email: 'admin@mail.com' }
    ]));

    component.form.setValue({ username: 'admin', password: '1234' });
    spyOn(component as any, 'showMsg');

    component.login();

    expect((component as any).showMsg).toHaveBeenCalledWith(false, 'Contraseña incorrecta');
  });

  it('debería mostrar error si el usuario no existe', () => {
    component.form.setValue({ username: 'nouser', password: '1234' });
    spyOn(component as any, 'showMsg');

    component.login();

    expect((component as any).showMsg).toHaveBeenCalledWith(false, 'Usuario no encontrado');
  });
});
