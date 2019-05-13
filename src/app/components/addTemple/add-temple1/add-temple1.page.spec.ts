import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemple1Page } from './add-temple1.page';

describe('AddTemple1Page', () => {
  let component: AddTemple1Page;
  let fixture: ComponentFixture<AddTemple1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTemple1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemple1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
