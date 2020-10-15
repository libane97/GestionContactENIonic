import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtudiantPage } from './etudiant.page';

describe('EtudiantPage', () => {
  let component: EtudiantPage;
  let fixture: ComponentFixture<EtudiantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtudiantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtudiantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
