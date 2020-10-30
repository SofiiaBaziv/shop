import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusProgramComponent } from './bonus-program.component';

describe('BonusProgramComponent', () => {
  let component: BonusProgramComponent;
  let fixture: ComponentFixture<BonusProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
