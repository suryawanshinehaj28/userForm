import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercountComponent } from './usercount.component';

describe('UsercountComponent', () => {
  let component: UsercountComponent;
  let fixture: ComponentFixture<UsercountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsercountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
