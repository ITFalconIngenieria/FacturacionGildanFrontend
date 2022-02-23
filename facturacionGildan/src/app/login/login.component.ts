import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginDTO } from '../models/Usuario';
import { UiServiceService } from '../Servicios/ui-service.service';
import { UsuarioService } from '../Servicios/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  loading: boolean = true;
  formulario: boolean = true;
  passwordVisible = false;
  checked = true;
  loginData!: LoginDTO;
  respuestaLogin: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private uiService: UiServiceService,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService
    ) {}

  ngOnInit(): void {

    this.limpiarCampos();
    
  }

  async submitForm() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {

      this.loginData = this.obtenerCampos();

      if( this.loginData.ad ){

        this.usuarioService.loginAD( this.loginData )
        .subscribe( resp => {

          this.respuestaLogin = resp;

          if( this.respuestaLogin[0]['token'] != null ){

            this.uiService.createNotification('success', 'Éxito', 'Sesion iniciada con exito.');
            this.limpiarCampos();
            this.route.navigate(['inicio']);

          } else {

            this.uiService.createNotification('error', 'Error', 'Error al iniciar sesion.');

          }

          this.spinner.hide();

          }, error => {
            
            //this.uiService.createMessage('error', error.message);
            this.uiService.createNotification('error', 'Error', 'Credenciales Incorrectas.');

            this.spinner.hide();

          }
        );

      }
      else {

        this.usuarioService.login(this.loginData)
          .subscribe(resp => {

            this.respuestaLogin = resp;

            if( this.respuestaLogin['token'] != null ){

              this.uiService.createNotification('success', 'Éxito', 'Sesion iniciada con exito.');
              this.limpiarCampos();
              this.route.navigate(['inicio']);

            } else {

              this.uiService.createNotification('error', 'Error', 'Error al iniciar sesion.');

            }

            this.spinner.hide();
            
          }, error => {

            //this.uiService.createMessage('error', error.message);
            this.uiService.createNotification('error', 'Error', 'Credenciales Incorrectas.');
            this.spinner.hide();

          }
          );

      }

    } else {

      this.uiService.createNotification('warning', 'Advertencia', 'Por favor, Ingrese las credenciales.');
      this.spinner.hide();

    }
    
  }

  validar(){
    this.route.navigate(['inicio']);
  }

  validarCampos(): string {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    return this.validateForm.status;
  }

  obtenerCampos(): LoginDTO {

    return {
      email: this.validateForm.controls.email.value,
      password: this.validateForm.controls.password.value,
      ad: JSON.parse( this.validateForm.controls.checked.value )
    };

  }

  limpiarCampos() {
    this.camposForm(this.loginData = 
      { 
        email: '', 
        password: '',
        ad: true 
      }, 
      true
    );
  }

  camposForm( login: LoginDTO, AD: any ){

    this.validateForm = this.fb.group({
      email: [ login.email, [Validators.required ]],
      password: [ login.password, [Validators.required ]],
      checked: [ AD, [Validators.required ]]
    });
  }


}
