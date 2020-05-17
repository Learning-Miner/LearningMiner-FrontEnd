import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {CookieService} from 'ngx-cookie-service';
import {map, catchError} from 'rxjs/operators';
import {handleError} from './error-handler';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';
import {BASE_URL} from '../shared/constants';
import {ConceptMap} from '../conceptmap-module/conceptmap/conceptmap.types';
import {Headers} from '@angular/http';
import {Map} from '../models/concept-map';

@Injectable()
export class UserService {

  readonly USER_END_POINT = BASE_URL + 'api/';
  tryGetUser = true;
  userToReturn: User = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Imposible completar la petición.');
  }

  // GET list of users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USER_END_POINT);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.USER_END_POINT}login`, {
      email,
      password
    }).pipe(
      map(_ => {
        this.tryGetUser = true;
        return _;
      }),
      catchError(handleError)
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRol() {
    return localStorage.getItem('rol');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  decode(): Observable<any> {
    if (this.userToReturn == null) {
      this.userToReturn = JSON.parse(localStorage.getItem('user'));
      return of(this.userToReturn);
    } else {
      return of(this.userToReturn);
    }
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(`${this.USER_END_POINT}signup`, user);
  }

  createMap(title: string, baseId: string): Observable<any> {
    return this.http.post(this.USER_END_POINT + 'cpt-map', {
      'isBase': false,
      'isDone': false,
      'baseId': baseId,
      'title': title,
      'concepts': [],
      'propositions': []
    });
  }

  getMaps(query: string): Observable<any> {
    return this.http.post<any>(`${this.USER_END_POINT}cpt-map/filter`, {query});
  }

  getMap(mapId: string): Observable<Map> {
    return this.http.get<Map>(`${this.USER_END_POINT}cpt-map/${mapId}`);
  }

  updateMap(mapId: string, newMap) {
    return this.http.put(this.USER_END_POINT + 'cpt-map/' + mapId, {
      concepts: newMap.concepts,
      propositions: newMap.propositions
    });
  }

  sendMap(mapId: string) {
    return this.http.put(this.USER_END_POINT + 'cpt-map/' + mapId, {
      isDone: true,
      dateFinished: new Date().toLocaleDateString() + 'T' + new Date().toLocaleTimeString()
    });
  }

  deleteMap(mapId: string): Observable<Map> {
    return this.http.delete<Map>(`${this.USER_END_POINT}cpt-map/${mapId}`);
  }

  getGroupReport(baseId) {
    return this.http.post(this.USER_END_POINT + 'reports/retrieve/' + baseId,
      {
        'query': 'group'
      });
  }

  getStudentReportStudent(baseId) {
    const query = 'student';
    return this.http.post(this.USER_END_POINT + 'reports/retrieve/' + baseId, {query});
  }

  getStudentReportTeacher(baseId, studentId) {
    const query = 'student';
    return this.http.post(this.USER_END_POINT + 'reports/retrieve/' + baseId, {
      query,
      student_id: studentId
    });
  }

  getStudentsReports(baseId): Observable<any> {
    return this.http.get(this.USER_END_POINT + 'reports/retrieve/' + baseId);
  }

  getActivities(query): Observable<any> {
    return this.http.post(this.USER_END_POINT + 'activity/filter', {query});
  }

  createActivity(activity): Observable<any> {
    console.log(activity);
    return this.http.post(this.USER_END_POINT + 'activity/create', activity);
  }

  getActivityTeacher(actId): Observable<any> {
    return this.http.post(`${this.USER_END_POINT}activity/${actId}`, {
      query: 'actId'
    });
  }

  getActivityStudent(baseId): Observable<any> {
    return this.http.post(`${this.USER_END_POINT}activity/${baseId}`, {
      query: 'baseId'
    });
  }

  updateActivity(actId, activity) {
    return this.http.put(`${this.USER_END_POINT}activity/${actId}`, activity);
  }

  closeActivity(actId): Observable<any> {
    return this.http.put(`${this.USER_END_POINT}activity/${actId}`,
      {
        'isClosed': true
      });
  }

  createReports(baseId): Observable<any> {
    return this.http.get(this.USER_END_POINT + 'reports/create/' + baseId);
  }

  isStudent() {
    if (localStorage.getItem('rol') === 'Student') {
      return true;
    }
    return false;
  }

  isTeacher() {
    if (localStorage.getItem('rol') === 'Teacher') {
      return true;
    }
    return false;
  }
}
