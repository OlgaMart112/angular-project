import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { CommentInterface } from '../interfaces/comment.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { filter, map, catchError } from 'rxjs/operators';
import { NotificationErrorService } from './notification-error.service';

@Injectable({
    providedIn: 'root',
})
export class CommentsService {
    constructor(private http: HttpClient, private notificationErrorService: NotificationErrorService) {}

    getComments$(): Observable<CommentInterface[]> {
        const url = `http://5bfff0a00296210013dc7e82.mockapi.io/test/steps`;
        return this.http.get<CommentInterface[]>(url).pipe(
            map((comments: CommentInterface[]) => comments.filter(comment => comment.isComment === true)),
            catchError((error: HttpErrorResponse) => {
                this.notificationErrorService.openSnackBarError(error.message);
                return EMPTY;
            }),
        );
    }

    putComments$(commentData: CommentInterface): Observable<CommentInterface[]> {
        const url = `http://5bfff0a00296210013dc7e82.mockapi.io/test/steps/${commentData.id}`;
        return this.http.put<CommentInterface[]>(url, commentData).pipe(
            catchError((error: HttpErrorResponse) => {
                this.notificationErrorService.openSnackBarError(error.message);
                return EMPTY;
            }),
        );
    }
}
