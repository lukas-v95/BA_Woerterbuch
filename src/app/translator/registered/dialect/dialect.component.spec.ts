import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialectComponent } from './dialect.component';

describe('DialectComponent', () => {
  let component: DialectComponent;
  let fixture: ComponentFixture<DialectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
