import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStatisticsContentComponent } from './single-statistics-content.component';

describe('SingleStatisticsContentComponent', () => {
  let component: SingleStatisticsContentComponent;
  let fixture: ComponentFixture<SingleStatisticsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleStatisticsContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleStatisticsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
