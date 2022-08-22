import { tap } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('You can sense something happened');
        console.log('But you dont know what it is');
        console.log(req.url);
        console.log(req.headers);
        
        return next.handle(req).pipe(
            tap(event => {
                    if(event.type === HttpEventType.Response) {
                        console.log('Incoming nuke, I mean message');
                        console.log(event.body);
                    }
                }
            )
        );
    }
}