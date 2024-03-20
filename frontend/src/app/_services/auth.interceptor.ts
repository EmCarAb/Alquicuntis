import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = this.authService.userToken;

    if (accessToken) {

        if (this.authService.isAuthTokenValid(accessToken)) {
        let modifiedReq = request.clone({
            headers: request.headers.append('Authorization', `Bearer ${accessToken}`)
        });
        return next.handle(modifiedReq)
        }
 
    }
    return next.handle(request);
    }
}