import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebsiteTeamComponent } from './website-team.component';

describe('WebsiteTeamComponent', () => {
  let component: WebsiteTeamComponent;
  let fixture: ComponentFixture<WebsiteTeamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WebsiteTeamComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
