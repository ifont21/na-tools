import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDiagnosisContainerComponent } from './self-diagnosis-container.component';

describe('SelfDiagnosisContainerComponent', () => {
  let component: SelfDiagnosisContainerComponent;
  let fixture: ComponentFixture<SelfDiagnosisContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfDiagnosisContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelfDiagnosisContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
