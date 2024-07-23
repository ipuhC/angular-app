import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsComponentComponent } from './subscriptions-component.component';

describe('SubscriptionsComponentComponent', () => {
  let component: SubscriptionsComponentComponent;
  let fixture: ComponentFixture<SubscriptionsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubscriptionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
