import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModProductosComponent } from './mod-productos.component';

describe('ModProductosComponent', () => {
  let component: ModProductosComponent;
  let fixture: ComponentFixture<ModProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModProductosComponent]
    });
    fixture = TestBed.createComponent(ModProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
