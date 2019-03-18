import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelpricePage } from './fuelprice.page';

describe('FuelpricePage', () => {
  let component: FuelpricePage;
  let fixture: ComponentFixture<FuelpricePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelpricePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelpricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
