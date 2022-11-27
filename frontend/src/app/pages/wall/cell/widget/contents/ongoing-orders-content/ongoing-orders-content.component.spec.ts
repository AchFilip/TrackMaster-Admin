import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingOrdersContentComponent } from './ongoing-orders-content.component';

describe('OngoingOrdersContentComponent', () => {
  let component: OngoingOrdersContentComponent;
  let fixture: ComponentFixture<OngoingOrdersContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingOrdersContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingOrdersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
