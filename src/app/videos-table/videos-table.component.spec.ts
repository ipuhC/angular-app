import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosTableComponent } from './videos-table.component';

describe('VideosTableComponent', () => {
  let component: VideosTableComponent;
  let fixture: ComponentFixture<VideosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
