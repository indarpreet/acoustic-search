import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideModule } from 'ng-click-outside';
import { map } from 'rxjs/operators';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { SearchTerm } from 'src/app/models/SearchTerm';
import { SearchEngineService } from 'src/app/services/search-engine.service';
import { HomeComponent } from '../home/home.component';
import { SearchEngineComponent } from './search-engine.component';


fdescribe('SearchEngineComponent', () => {
  let component: SearchEngineComponent;
  let fixture: ComponentFixture<SearchEngineComponent>;
  let httpClientModule;
  let service: SearchEngineService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,
        HomeComponent, SearchEngineComponent],
      providers: [SearchEngineService],
      imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        ClickOutsideModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule]
    })
      .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientModule = TestBed.get(HttpClientModule);
    service = TestBed.get(SearchEngineService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should check the response of http is 200 ', () => {
    let searchTerm = SearchTerm.getSearchTermInstance();
    searchTerm.term = "dan";

    service.getSearchResults(searchTerm).subscribe(response => {
      expect(response).toBeTruthy();
      console.log(response);
      expect(response.length).toEqual(5);
    });

  });

  fit('should check the value changes of input is working as expected', () => {
    const el = fixture.nativeElement.querySelector('input');
    el.value = 'dan';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.searchEngine.value).toBe("dan");
    })
  })

  fit('check on click of a button search is being called', () => {
    spyOn(component, 'search');
    const el = fixture.nativeElement.querySelector('button');
    el.click();
    //fixture.detectChanges();
    expect(component.search).toHaveBeenCalled();
  })
});


// describe('ComponentName' ,()=>{
//   let component;
//   let fixture : ComponentFixture<SearchEngineComponent>;
//   beforeEach(async(()=>{
//     TestBed.configureTestingModule({
//       declarations : [],
//       providers : [],
//       imports : []
//     })
//   }));

//   beforeEach(()=>{
//     fixture = TestBed.createComponent(SearchEngineComponent);
//     component = fixture.componentInstance;
//   })

//  it( 'should test so and so' , ()=>{

//   })
// })
