import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateEventEdit } from './private-event-edit';

describe('PrivateEventEdit', () => {
  let component: PrivateEventEdit;
  let fixture: ComponentFixture<PrivateEventEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateEventEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateEventEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
