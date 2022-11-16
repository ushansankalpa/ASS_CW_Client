import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

type EntityArrayResponseType = HttpResponse<any[]>;
type EntityResponseType = HttpResponse<any>;


@Injectable({ providedIn: 'root' })
export class HomePageService {
    constructor(private http: HttpClient) {

    }

    save(data: any, plannumber: any): Observable<EntityResponseType> {
        return this.http.post<any>(`${environment.apiUrl}/api/questions`, data, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        // const options = createRequestOption(req);
         return this.http.get<any>(`${environment.apiUrl}/api/questions`, { params: req, observe: 'response' });
       }

}

