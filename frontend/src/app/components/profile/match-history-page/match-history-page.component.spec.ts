import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchHistoryPageComponent } from './match-history-page.component';

describe('MatchHistoryPageComponent', () => {
  let component: MatchHistoryPageComponent;
  let fixture: ComponentFixture<MatchHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchHistoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
