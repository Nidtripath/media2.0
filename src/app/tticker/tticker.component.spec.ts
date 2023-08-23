import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtickerComponent } from './tticker.component';

describe('TtickerComponent', () => {
  let component: TtickerComponent;
  let fixture: ComponentFixture<TtickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
