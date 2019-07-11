import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredContainerComponent } from './unregistered-container.component';

describe('UnregisteredContainerComponent', () => {
  let component: UnregisteredContainerComponent;
  let fixture: ComponentFixture<UnregisteredContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisteredContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisteredContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
