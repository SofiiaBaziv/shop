import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHealthProgramsComponent } from './admin-health-programs.component';

describe('AdminHealthProgramsComponent', () => {
  let component: AdminHealthProgramsComponent;
  let fixture: ComponentFixture<AdminHealthProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHealthProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHealthProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
