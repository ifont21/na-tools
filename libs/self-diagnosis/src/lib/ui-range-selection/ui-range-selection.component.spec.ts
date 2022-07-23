import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiRangeSelectionComponent } from './ui-range-selection.component';

describe('UiRangeSelectionComponent', () => {
  let component: UiRangeSelectionComponent;
  let fixture: ComponentFixture<UiRangeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiRangeSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiRangeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
