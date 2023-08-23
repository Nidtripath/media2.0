import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayVidComponent } from './play-vid.component';

describe('PlayVidComponent', () => {
  let component: PlayVidComponent;
  let fixture: ComponentFixture<PlayVidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayVidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayVidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
