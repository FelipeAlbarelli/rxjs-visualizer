import { Component } from '@angular/core';
import { BoardComponent } from '../../components/board/board.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [BoardComponent, SideBarComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
