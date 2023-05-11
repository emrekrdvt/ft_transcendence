import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileidComponent } from './profileid.component';

describe('ProfileidComponent', () => {
  let component: ProfileidComponent;
  let fixture: ComponentFixture<ProfileidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
