import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesDrapeaux } from './les-drapeaux';

describe('LesDrapeaux', () => {
  let component: LesDrapeaux;
  let fixture: ComponentFixture<LesDrapeaux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LesDrapeaux]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesDrapeaux);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
