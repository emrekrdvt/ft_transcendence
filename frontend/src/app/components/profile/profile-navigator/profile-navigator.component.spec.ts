import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNavigatorComponent } from './profile-navigator.component';

describe('ProfileNavigatorComponent', () => {
  let component: ProfileNavigatorComponent;
  let fixture: ComponentFixture<ProfileNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileNavigatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
