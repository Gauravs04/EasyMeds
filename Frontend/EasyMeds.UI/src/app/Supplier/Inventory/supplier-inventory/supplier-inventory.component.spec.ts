import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInventoryComponent } from './supplier-inventory.component';

describe('SupplierInventoryComponent', () => {
  let component: SupplierInventoryComponent;
  let fixture: ComponentFixture<SupplierInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
