import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletequestioinComponent } from './deletequestioin.component';

describe('DeletequestioinComponent', () => {
  let component: DeletequestioinComponent;
  let fixture: ComponentFixture<DeletequestioinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletequestioinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletequestioinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
