import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesNations } from './les-nations';

describe('LesNations', () => {
  let component: LesNations;
  let fixture: ComponentFixture<LesNations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LesNations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesNations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
