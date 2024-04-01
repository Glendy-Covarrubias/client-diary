import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { MESSAGES } from 'src/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private userService:UserService,
    private toastr: ToastrService, 
    private router: Router) { 
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
  }

  login(): void {
    //login
    //this.router.navigate(['diary']);
    /*this.UserService.getAllDiary().subscribe({
      next: (response: any) => {
        this.tableDiary.setDataColums(this.configColumns);
        this.tableDiary.setDataRows(response.data);
      },
      error: (error) => {
        console.log("PUBLICANDO ERROR: ", error);
        this.toastr.error(`${MESSAGES.ERROR} ERROR: ${error.message}`, "Error")
      }
    });*/

    if(!this.loginForm.invalid){

      this.userService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if(response.status === 200) {
            localStorage.setItem("token", response.data.token);
          }
        },
        error: (e) => {
          if (e.error.status === 400) {
            this.toastr.error(e.error.message, "Error");
          } else {
            this.toastr.error(`${MESSAGES.ERROR} APPLICATION ERROR: ${e.error.message}`, "Error");
          }
        },
        complete: () => this.router.navigate(['diary'])
      });
    }
  }

}
