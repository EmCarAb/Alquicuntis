import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    
    requestData$!: Observable<any>;
    
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        public toastService: ToastService) { }
    ngOnInit(): void {
    
    this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    })
    }
    
    onFormSubmit(): void {
    const formData: any = this.loginForm.value;
    this.authService.login(formData?.username, formData?.password)
        .subscribe((res: any) => {
        console.log(res.userInfo)
        this.router.navigate(['/'])
        }, (err) => {
        this.showDanger()
        });
    }
    
    showDanger() {
        this.toastService.show('Username o contraseña incorrecta.', { classname: 'bg-danger text-light', delay: 5000 });
    }
}