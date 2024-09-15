import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableArrowWrapperComponent } from './draggable-arrow-wrapper.component';

describe('DraggableArrowWrapperComponent', () => {
  let component: DraggableArrowWrapperComponent;
  let fixture: ComponentFixture<DraggableArrowWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableArrowWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraggableArrowWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
