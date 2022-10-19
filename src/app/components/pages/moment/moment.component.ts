import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import {
  FormGroup,
  FormGroupDirective,
  Validators,
  FormControl,
} from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/Comment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  faTimes = faTimes;
  faEdit = faEdit;
  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService
      .getMoment(id)
      .subscribe((response) => (this.moment = response.body!));
    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messagesService.add('Momento excluído com sucesso!');
    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }
    const data: Comment = this.commentForm.value;
    data.moment = {} as Moment;
    data.moment!.id = this.moment!.id;
    await this.commentService.createComment(data).subscribe((response) => {
      this.moment!.comments!.push(response.body!);
      this.messagesService.add('Comentário adicionado com sucesso!');
    });
    this.commentForm.reset();
    formDirective.resetForm();
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }
}
