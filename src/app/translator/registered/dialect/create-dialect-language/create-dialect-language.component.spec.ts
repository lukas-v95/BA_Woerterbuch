import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDialectLanguageComponent } from './create-dialect-language.component';

describe('CreateDialectLanguageComponent', () => {
  let component: CreateDialectLanguageComponent;
  let fixture: ComponentFixture<CreateDialectLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDialectLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDialectLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
