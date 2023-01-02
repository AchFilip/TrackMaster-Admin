import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisicsCompanyComponent } from './statisics-company.component';

describe('StatisicsCompanyComponent', () => {
  let component: StatisicsCompanyComponent;
  let fixture: ComponentFixture<StatisicsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisicsCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisicsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
