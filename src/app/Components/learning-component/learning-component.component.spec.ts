import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningComponentComponent } from './learning-component.component';

describe('LearningComponentComponent', () => {
  let component: LearningComponentComponent;
  let fixture: ComponentFixture<LearningComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
