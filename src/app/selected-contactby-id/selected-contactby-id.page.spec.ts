import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectedContactbyIdPage } from './selected-contactby-id.page';

describe('SelectedContactbyIdPage', () => {
  let component: SelectedContactbyIdPage;
  let fixture: ComponentFixture<SelectedContactbyIdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedContactbyIdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedContactbyIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
