import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemploPage } from './add-templo.page';

describe('AddTemploPage', () => {
  let component: AddTemploPage;
  let fixture: ComponentFixture<AddTemploPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTemploPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemploPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
