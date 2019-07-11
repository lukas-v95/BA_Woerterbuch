import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSynonymComponent } from './delete-synonym.component';

describe('DeleteSynonymComponent', () => {
  let component: DeleteSynonymComponent;
  let fixture: ComponentFixture<DeleteSynonymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSynonymComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSynonymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
