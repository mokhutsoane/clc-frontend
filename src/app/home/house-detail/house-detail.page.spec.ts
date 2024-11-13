import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HouseDetailPage } from './house-detail.page';

describe('HouseDetailPage', () => {
  let component: HouseDetailPage;
  let fixture: ComponentFixture<HouseDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
