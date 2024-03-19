import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeBorrarComponent } from './mensaje-borrar.component';

describe('MensajeBorrarComponent', () => {
  let component: MensajeBorrarComponent;
  let fixture: ComponentFixture<MensajeBorrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeBorrarComponent]
    });
    fixture = TestBed.createComponent(MensajeBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
