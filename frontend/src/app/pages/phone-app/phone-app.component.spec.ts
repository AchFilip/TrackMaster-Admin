import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneAppComponent } from './phone-app.component';

describe('PhoneAppComponent', () => {
  let component: PhoneAppComponent;
  let fixture: ComponentFixture<PhoneAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
