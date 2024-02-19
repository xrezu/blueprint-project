import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinantialEntityComponent } from './finantial-entity.component';

describe('FinantialEntityComponent', () => {
  let component: FinantialEntityComponent;
  let fixture: ComponentFixture<FinantialEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinantialEntityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinantialEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
