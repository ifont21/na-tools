import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiResultComponent } from './ui-result.component';

describe('UiResultComponent', () => {
  let component: UiResultComponent;
  let fixture: ComponentFixture<UiResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
