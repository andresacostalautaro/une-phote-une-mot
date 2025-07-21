import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LHistorique } from './l-historique';

describe('LHistorique', () => {
  let component: LHistorique;
  let fixture: ComponentFixture<LHistorique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LHistorique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LHistorique);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
