import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsEntityCardComponent } from './rxjs-entity-card.component';

describe('RxjsEntityCardComponent', () => {
  let component: RxjsEntityCardComponent;
  let fixture: ComponentFixture<RxjsEntityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsEntityCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsEntityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
