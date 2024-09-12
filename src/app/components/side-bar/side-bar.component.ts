import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsEntitiesService } from '../../rxjs/rxjs-entities.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  constructor(protected rxjsService: RxjsEntitiesService) {}

  rxjsOperators = this.rxjsService.allOperators;

  ngOnInit() {
    this.rxjsOperators.subscribe((x) => {
      console.log(x);
    });
  }
}
