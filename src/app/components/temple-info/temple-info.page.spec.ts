import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleInfoPage } from './temple-info.page';

describe('TempleInfoPage', () => {
  let component: TempleInfoPage;
  let fixture: ComponentFixture<TempleInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempleInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempleInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
