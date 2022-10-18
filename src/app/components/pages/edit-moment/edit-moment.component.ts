import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe((response) => {
      this.moment = response.body!;
    });
  }

  async editHandler(moment: Moment) {
    await this.momentService.updateMoment(moment).subscribe((response) => {
      this.messagesService.add(response.messages[0]);
    });
    this.router.navigate(['/']);
  }
}
