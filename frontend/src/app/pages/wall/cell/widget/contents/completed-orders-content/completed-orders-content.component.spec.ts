import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedOrdersContentComponent } from './completed-orders-content.component';

describe('CompletedOrdersContentComponent', () => {
  let component: CompletedOrdersContentComponent;
  let fixture: ComponentFixture<CompletedOrdersContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedOrdersContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedOrdersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
