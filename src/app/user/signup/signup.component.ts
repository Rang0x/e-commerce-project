import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm = new FormGroup({
    name: new FormControl ('', [Validators.minLength(4), Validators.required]),
    email: new FormControl ('', [Validators.email, Validators.required]),
    password: new FormControl ('', [Validators.pattern(/^[A-Z](?=.*[!@#$%^&*()]).{7,}$/), Validators.required]),
    rePassword: new FormControl ('', [Validators.pattern(/^[A-Z](?=.*[!@#$%^&*()_]).{7,}$/), Validators.required]),
    phone: new FormControl ('', [Validators.pattern(/^(01[0125]\d{8})$/), Validators.required])
  }, this.passwordMatch);
  constructor(private _auth:AuthService, private _router:Router){}
  passwordMatch(g:any){
    return g.get('password')?.value === g.get('rePassword')?.value ? null : {'mismatch' : true};
  }
  signUpSubmit(){
    this._auth.signUp(this.signupForm.value).subscribe((res) => {
      console.log(res);
      this._router.navigate(['/login'])
    })
    console.log(this.signupForm.value);
  }
}
