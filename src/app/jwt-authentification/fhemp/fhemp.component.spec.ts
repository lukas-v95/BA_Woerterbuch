import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FHEmployeeComponent } from './fhemp.component';

describe('FHEmployeeComponent', () => {
  let component: FHEmployeeComponent;
  let fixture: ComponentFixture<FHEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FHEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FHEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
