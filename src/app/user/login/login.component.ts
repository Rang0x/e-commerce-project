import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  visible: boolean = false;
  codeForm: boolean = false;
  newPForm: boolean = false;
  errorMsg:string = '';
  loginForm = new FormGroup({
    email: new FormControl ('', [Validators.email, Validators.required]),
    password: new FormControl ('', [Validators.pattern(/^[A-Z](?=.*[!@#$%^&*()]).{7,}$/), Validators.required])
  });
  resetEmail = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  })
  verifyCode = new FormGroup({
    resetCode: new FormControl('', [Validators.required])
  })
  newPassForm = new FormGroup({
    email: new FormControl ('', [Validators.email, Validators.required]),
    newPassword: new FormControl ('', [Validators.pattern(/^[A-Z](?=.*[!@#$%^&*()]).{7,}$/), Validators.required])
  });
  constructor(private _auth:AuthService, private _router: Router){}
  loginSubmit(){
    this._auth.signIn(this.loginForm.value).subscribe({
      next: (res) => {
        if(res.message == 'success'){
          localStorage.setItem('userToken', res.token);
          localStorage.setItem('userName', res.user.name);
          this._auth.userName = res.user.name;
          this._auth.uId = res.user.id;
          this._auth.decodeUserToken();
          console.log(this._auth.uId);
          this._router.navigate(['/home']);
          this._auth.shareData();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  sendEmail(){
    this._auth.resetEmail(this.resetEmail.value).subscribe({
      next: (res)=> {this.codeForm = true},
      error: (err)=> {
        console.log(err);
        this.errorMsg = err.error.message;
      }
    })
  }
  codeSubmit(){
    this._auth.verifyCode(this.verifyCode.value).subscribe((res) => {
      this.codeForm = false;
      this.newPForm = true;
    })
  }
  newPass(){
    this._auth.newPass(this.newPassForm.value).subscribe((res) => {
      console.log(res);
      this._router.navigate(['/home']);
      localStorage.setItem('userToken', res.token);
      this._auth.shareData();
    })
  }
  showDialog() {
      this.visible = true;
  }
}
