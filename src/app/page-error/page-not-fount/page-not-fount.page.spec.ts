import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFountPage } from './page-not-fount.page';

describe('PageNotFountPage', () => {
  let component: PageNotFountPage;
  let fixture: ComponentFixture<PageNotFountPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
