import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeCardComponent } from './shape-card.component';

describe('ShapeCardComponent', () => {
  let component: ShapeCardComponent;
  let fixture: ComponentFixture<ShapeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
