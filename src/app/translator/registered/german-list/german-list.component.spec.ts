import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GermanListComponent } from './german-list.component';

describe('GermanListComponent', () => {
  let component: GermanListComponent;
  let fixture: ComponentFixture<GermanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GermanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GermanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
