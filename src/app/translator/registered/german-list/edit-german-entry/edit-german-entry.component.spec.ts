import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGermanEntryComponent } from './edit-german-entry.component';

describe('EditGermanEntryComponent', () => {
  let component: EditGermanEntryComponent;
  let fixture: ComponentFixture<EditGermanEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGermanEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGermanEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
