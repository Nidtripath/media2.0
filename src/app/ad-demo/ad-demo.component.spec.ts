import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDemoComponent } from './ad-demo.component';

describe('AdDemoComponent', () => {
  let component: AdDemoComponent;
  let fixture: ComponentFixture<AdDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
