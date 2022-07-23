import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDiagnosisComponent } from './self-diagnosis.component';

describe('SelfDiagnosisComponent', () => {
  let component: SelfDiagnosisComponent;
  let fixture: ComponentFixture<SelfDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfDiagnosisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelfDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
