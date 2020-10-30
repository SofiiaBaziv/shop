import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLikeListComponent } from './profile-like-list.component';

describe('ProfileLikeListComponent', () => {
  let component: ProfileLikeListComponent;
  let fixture: ComponentFixture<ProfileLikeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLikeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLikeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
