import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemple3Page } from './add-temple3.page';

describe('AddTemple3Page', () => {
  let component: AddTemple3Page;
  let fixture: ComponentFixture<AddTemple3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTemple3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemple3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
