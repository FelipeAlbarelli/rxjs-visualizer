import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsActiveItemComponent } from './rxjs-active-item.component';

describe('RxjsActiveItemComponent', () => {
  let component: RxjsActiveItemComponent;
  let fixture: ComponentFixture<RxjsActiveItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsActiveItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsActiveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
