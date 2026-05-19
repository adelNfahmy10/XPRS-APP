import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpeicalsOffersSlidersComponent } from './speicals-offers-sliders.component';

describe('SpeicalsOffersSlidersComponent', () => {
  let component: SpeicalsOffersSlidersComponent;
  let fixture: ComponentFixture<SpeicalsOffersSlidersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeicalsOffersSlidersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeicalsOffersSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
