import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemple2Page } from './add-temple2.page';

describe('AddTemple2Page', () => {
  let component: AddTemple2Page;
  let fixture: ComponentFixture<AddTemple2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTemple2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemple2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
