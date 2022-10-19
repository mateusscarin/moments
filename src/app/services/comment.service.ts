import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/Comment';
import { Response } from 'src/app/Response';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  createComment(comment: Comment): Observable<Response<Comment>> {
    return this.http.post<Response<Comment>>(
      `${this.baseApiUrl}/comment`,
      comment
    );
  }
}
