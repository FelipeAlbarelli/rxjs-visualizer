import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MainPageComponent } from './app/pages/main-page/main-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainPageComponent],
  template: `
    <app-main-page><app-main-page/>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
