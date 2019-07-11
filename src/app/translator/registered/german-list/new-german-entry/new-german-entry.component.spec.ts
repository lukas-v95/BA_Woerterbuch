import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGermanEntryComponent } from './new-german-entry.component';

describe('NewGermanEntryComponent', () => {
  let component: NewGermanEntryComponent;
  let fixture: ComponentFixture<NewGermanEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGermanEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGermanEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
