import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsFormComponent } from './obs-form.component';

describe('ObsFormComponent', () => {
  let component: ObsFormComponent;
  let fixture: ComponentFixture<ObsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
