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

    createQuestion(data: any, id:any): Observable<EntityResponseType> {
        return this.http.post<any>(`${environment.apiUrl}/api/quesion/create/${id}`, data, { observe: 'response' });
    }

    createAnswers(data: any, id:any): Observable<EntityResponseType> {
        return this.http.post<any>(`${environment.apiUrl}/api/answers/create/${id}`, data, { observe: 'response' });
    }

    upVoteQuestion(id: any): Observable<EntityResponseType> {
        return this.http.put<any>(`${environment.apiUrl}/api/upvote/update/${id}`, { observe: 'response' });
    }

    anwsUpVoteQuestion(id: any): Observable<EntityResponseType> {
        return this.http.put<any>(`${environment.apiUrl}/api/upvote/ans/${id}`, { observe: 'response' });
    }

    answers(id?: any): Observable<EntityArrayResponseType> {
        // const options = createRequestOption(req);
         return this.http.get<any>(`${environment.apiUrl}/api/answers/${id}`, { observe: 'response' });
       }

    getUser(): Observable<EntityResponseType> {
        return this.http.get<any>(`${environment.apiUrl}/api/user`, { observe: 'response' });
    }

    search(data: any): Observable<EntityArrayResponseType> {
        return this.http.post<any>(`${environment.apiUrl}/api/search`, data, { observe: 'response' });
    }

    bookmark(qid: any, userid: any): Observable<EntityArrayResponseType> {
        return this.http.post<any>(`${environment.apiUrl}/api/bookmarks/add/${qid}/${userid}`, { observe: 'response' });
    }

    queryProfile(id?: any): Observable<EntityArrayResponseType> {
        // const options = createRequestOption(req);
         return this.http.get<any>(`${environment.apiUrl}/api/profile/question/${id}`, { observe: 'response' });
       }

       updateQuestion(data: any, id:any): Observable<EntityResponseType> {
        return this.http.put<any>(`${environment.apiUrl}/api/quesion/update/${id}`, data, { observe: 'response' });
       }

       deleteQuestion(id:any): Observable<EntityResponseType> {
        return this.http.delete<any>(`${environment.apiUrl}/api/quesion/delete/${id}`, { observe: 'response' });
       }


}

