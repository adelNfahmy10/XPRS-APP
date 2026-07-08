import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvcPointsPage } from './tvc-points.page';

describe('TvcPointsPage', () => {
  let component: TvcPointsPage;
  let fixture: ComponentFixture<TvcPointsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TvcPointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
