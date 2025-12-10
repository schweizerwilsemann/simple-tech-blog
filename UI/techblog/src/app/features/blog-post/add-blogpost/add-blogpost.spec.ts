import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogpostComponent } from './add-blogpost';

describe('AddBlogpost', () => {
  let component: AddBlogpostComponent;
  let fixture: ComponentFixture<AddBlogpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBlogpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlogpostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
