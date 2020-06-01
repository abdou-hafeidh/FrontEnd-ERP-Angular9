import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/components/models/userProfile';


export class User {
  constructor(
    public status: string,
     ) {}
}
export class JwtResponse {
  constructor(
    public jwttoken: string,
     ) {}
}

const ID = 'id';
const TOKEN = 'token';
const USERNAME = 'username';

@Injectable({
  providedIn: 'root'
})


export class LoginServiceService {


  constructor(private httpClient: HttpClient) {}

  URL = 'http://localhost:8080/api/auth/';
  userUrl = 'http://localhost:8080/user/listUsers/';

  userData: Object;
  authenticate(username, password) {
    return this.httpClient.post<any>(`${this.URL}` + 'signin', {username, password}).pipe(
     map(
       userData => {
        sessionStorage.setItem(USERNAME, username);
        sessionStorage.setItem(ID,  userData.id);
        let tokenStr =  userData.accessToken;
        sessionStorage.setItem(TOKEN, tokenStr);
        return userData;
       }
     )
    );
  }

  addUser(userProfile: UserProfile): Observable<Object> {
    return this.httpClient.post(`${this.URL}` + 'signup', userProfile);
  }

  getUser(): Observable<any> {
    let id = sessionStorage.getItem(ID);
    return this.httpClient.get(this.userUrl + id);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USERNAME);
    return !(user === null);
  }

  loggedIn() {
    return sessionStorage.getItem(TOKEN);
  }

  logOut() {
    sessionStorage.removeItem(USERNAME);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(ID);
  }


}
