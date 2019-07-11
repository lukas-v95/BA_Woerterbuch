import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialectListComponent } from './dialect-list.component';

describe('DialectListComponent', () => {
  let component: DialectListComponent;
  let fixture: ComponentFixture<DialectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
