import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMatrixComponent } from './random-matrix.component';

describe('RandomMatrixComponent', () => {
  let component: RandomMatrixComponent;
  let fixture: ComponentFixture<RandomMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
