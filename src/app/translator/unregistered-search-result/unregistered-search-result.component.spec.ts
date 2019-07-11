import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredSearchResultComponent } from './unregistered-search-result.component';

describe('UnregisteredSearchResultComponent', () => {
  let component: UnregisteredSearchResultComponent;
  let fixture: ComponentFixture<UnregisteredSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisteredSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisteredSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
