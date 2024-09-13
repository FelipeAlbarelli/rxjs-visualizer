import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsEntitiesService } from '../../rxjs/rxjs-entities.service';
import { RxjsEntityCardComponent } from '../rxjs-entity-card/rxjs-entity-card.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule , RxjsEntityCardComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  constructor(protected rxjsService: RxjsEntitiesService) {}

  rxjsOperators = this.rxjsService.allOperators;

  ngOnInit() {
    this.rxjsOperators.subscribe((x) => {
      // console.log(x);
    });
  }

  log = (e: any) => {
    console.log(e)
  }
}
