import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { Usuario, UsuarioGuardar } from '../shared/interfaces/usuarios';
import { AppConstants } from '../shared/app-constants';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    ACCESS_TOKEN = 'access_token';
    REFRESH_TOKEN = 'refresh_token';

    constructor(private http: HttpClient, private router: Router) {
    }

    get userToken(): any {
        const access_token = (<string>localStorage.getItem(this.ACCESS_TOKEN))
        return access_token
    }

    get userData(): any {
        let userData = "";
        userData = this.userToken ? this.getUserDataFromToken(this.userToken).sub : "No logged"
        return userData
    }

    get isAdmin(): any {
        return this.getUserDataFromToken(this.userToken).is_administrator
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${environment.apiBaseUrl}/api/login`, { username, password }).pipe(
            map((res: any) => {
                const access_token = res.access_token;

                localStorage.setItem(this.ACCESS_TOKEN, access_token)
                return res
            })
        )
    }

    logout(): void {
        localStorage.removeItem(this.ACCESS_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
        this.router.navigate(["/"])
    }

    get isAuthenticated(): boolean {
        const refresh_token = this.userToken;
        if (!refresh_token) {
            return false
        }
        return this.isAuthTokenValid(refresh_token)
    }

    isAuthTokenValid(token: string): boolean {
        const decoded: any = jwtDecode(token);

        const expMilSecond: number = decoded?.exp * 1000; // milliseconds
        const currentTime = Date.now(); // milliseconds

        if (expMilSecond < currentTime) {
            return false;
        }
        return true;
    }

    getUserDataFromToken(token: string): any {
        const decoded: any = jwtDecode(token);
        return decoded
    }

    getUser(){
        return this.http.get<Usuario[]>(AppConstants.USERS_ENDPOINT)
    }

    addUser(usuario: FormData){
        return this.http.post<UsuarioGuardar>(AppConstants.USERS_ENDPOINT, usuario)
  }

}