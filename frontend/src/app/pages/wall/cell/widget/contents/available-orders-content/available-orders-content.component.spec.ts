import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableOrdersContentComponent } from './available-orders-content.component';

describe('AvailableOrdersContentComponent', () => {
  let component: AvailableOrdersContentComponent;
  let fixture: ComponentFixture<AvailableOrdersContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableOrdersContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableOrdersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
