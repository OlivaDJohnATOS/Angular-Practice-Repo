import { Post } from './post.model';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}
    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content}
        this.http.post<{name: string}>(
            'https://ng-guide-57e5f-default-rtdb.firebaseio.com/posts.json',
             postData,
             {
                observe: 'response'
             }
             )
             .subscribe(responseData => {
              console.log(responseData);
              
             },
             error => {
                this.error.next(error.message);
             }
        );
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');

        return this.http.get<{[key: string]: Post }>(
            'https://ng-guide-57e5f-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
                params: searchParams,
                //responseType: 'text'
            }
        )
            .pipe(map(responseData => {
            const postsArr: Post[] = [];
            for (const key in responseData){
                if(responseData.hasOwnProperty(key)) {
                postsArr.push({ ...responseData[key], id: key})
                }
            }
            return postsArr;
            }), catchError(errorRes => {
                //
                return throwError(errorRes);
            })
        );
    }

    deletePosts() {
        return this.http.delete(
            'https://ng-guide-57e5f-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(
            tap(
                event => {
                    console.log(event);

                    if(event.type === HttpEventType.Response) {
                        console.log(event.body);
                        
                    }
                }
            )
        );
    }
}