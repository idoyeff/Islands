import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandsMenuComponent } from './islands-menu.component';

describe('IslandsMenuComponent', () => {
  let component: IslandsMenuComponent;
  let fixture: ComponentFixture<IslandsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslandsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslandsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
