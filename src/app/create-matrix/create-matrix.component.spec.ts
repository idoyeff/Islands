import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMatrixComponent } from './create-matrix.component';

describe('CreateMatrixComponent', () => {
  let component: CreateMatrixComponent;
  let fixture: ComponentFixture<CreateMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
