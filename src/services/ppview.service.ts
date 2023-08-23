import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  BehaviorSubject,
  throwError,
  map,
  catchError,
} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PpviewService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;
  apiURL = 'http://localhost:8082';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  selVideo: any;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  getContents(type: string) {
    return this.http.get<any>(`${this.apiURL}/getAllContents?type=${type}`);
  }

  register(user: any) {
    return this.http.post(`http://localhost:8082/users`, user);
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', text: message });
  }

  clear() {
    // clear by calling subject.next() without parameters
    this.subject.next(true);
  }

  login(email: string, password: string) {
    const queryParams = `?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`;
    return this.http.get<any>(`http://localhost:8082/login${queryParams}`).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  // getRentContent(type: string) {
  // let headers= new HttpHeaders()
  // .set("Authorization",`beader ${localStorage.getItem('token')}`)
  //   return this.http.get<any>(`${this.apiURL}/getAllContents?type=${type}`,{headers})
  // }

  // getFreemiumContent(): Observable<any[]> {
  //   let params = new HttpParams().set('type', 'freemium');
  //   return this.http
  //     .get<any[]>(`${this.apiURL}/getAllContents`, {
  //       params: {

  //       }
  //     }).pipe(catchError(this.handleError));
  // }

  // getRentContent(): Observable<any[]> {
  //   return this.http
  //     .get<any[]>(`${this.apiURL}/getAllContents?type=rent`, {
  //       params: {
  //       }
  //     }).pipe(catchError(this.handleError));
  // }

  // fetchInningSummary(username: string, password: string, empId: long): Observable<any> {
  //   return this.http
  //   .post<any>(`${this.apiURL}/users?match_code=${matchId}`, this.httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  // exp() {
  // this.http.post('url', {
  //   first_name: val.first_name,
  //   last_name: val.last_name,
  //   email: val.email,
  // })
  //   .subscribe(response => {

  //   });
  // }
}
