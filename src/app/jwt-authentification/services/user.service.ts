import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URIHelper } from '../../../uri-helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = URIHelper.getBaseUrl() + 'api/test/user';
  private fhEmpUrl = URIHelper.getBaseUrl() + 'api/test/fhemp';
  private adminUrl = URIHelper.getBaseUrl() + 'api/test/admin';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getFhEmpUrlBoard(): Observable<string> {
    return this.http.get(this.fhEmpUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}
