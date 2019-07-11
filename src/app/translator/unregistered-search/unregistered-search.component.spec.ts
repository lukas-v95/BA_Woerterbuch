import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredSearchComponent } from './unregistered-search.component';

describe('UnregisteredSearchComponent', () => {
  let component: UnregisteredSearchComponent;
  let fixture: ComponentFixture<UnregisteredSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisteredSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisteredSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
