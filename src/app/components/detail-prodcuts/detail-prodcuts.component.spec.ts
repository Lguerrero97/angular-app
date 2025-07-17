import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProdcutsComponent } from './detail-prodcuts.component';

describe('DetailProdcutsComponent', () => {
  let component: DetailProdcutsComponent;
  let fixture: ComponentFixture<DetailProdcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProdcutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailProdcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
