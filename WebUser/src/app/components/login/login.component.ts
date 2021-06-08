import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { iLogin } from '../../models/login.interface';
import { iResponse } from '../../models/response.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.checklocalStorage();
  }

  checklocalStorage(){
    //Falta validacion
    if(localStorage.getItem("token")){
      this.router.navigate(['userList']);
    }
  }

  onLogin(form:iLogin){
    this.apiService.loginByEmail(form).subscribe(data => {
      const dataResponse:iResponse = data;
      if(dataResponse.token != null){
        localStorage.setItem("token", dataResponse.token);
        this.router.navigate(['userList']);
      }else{
        //Falta tomar el mensaje de error
        this.errorStatus = true;
        this.errorMsj = 'Error';
      }
    });
  }

}
