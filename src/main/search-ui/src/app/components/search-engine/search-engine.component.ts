import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from "rxjs/operators";
import { SearchTerm } from 'src/app/models/SearchTerm';
import { UserDetails } from 'src/app/models/UserDetails';
import { SearchEngineService } from 'src/app/services/search-engine.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {

  searchEngine: FormControl = new FormControl();
  userTopTenList: Array<UserDetails>;
  searchTerm: SearchTerm;
  showDropDown : boolean;
  fromSelectedCriteria : boolean;
  uniqueSearchIndex : Array<string>;
  eventTriggerd : {searchTerm : string , searchEvent : boolean};
  @ViewChild('smartSearch' , {static : true}) smartSearchRef : ElementRef;

  constructor(private route : Router  , private searchEngineService: SearchEngineService) {
    this.searchTerm = SearchTerm.getSearchTermInstance();
  }

  ngOnInit() {
    /**
     * Typeahead form control
     */
    const typeahead = this.searchEngine.valueChanges.pipe(
      map((query) => {
        this.eventTriggerd = { searchEvent : false , searchTerm :  this.searchEngine.value};
        return query.length > 0 ? query : false;
      }),
      filter((query) => query),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.searchTerm.term = searchTerm.toLowerCase();
        this.searchTerm.pageNo = 0;
        return this.searchEngineService.getSearchResults(this.searchTerm);
      })
    );

    typeahead.subscribe(
      (response) => {
        
        this.userTopTenList = response;
        // Event already triggered and user is waiting for response.
        //this.getDistinctSearchCriteriaValues(this.userTopTenList);
        this.showDropDown =true;
      },
      (error) => {
        console.log("error occured while fetching search results");
      }
    );
  }

  getDistinctSearchCriteriaValues(userTopTenList : Array<UserDetails>){
    //const searchIndexes = userTopTenList.map(item => item.sortCriteria.substring(item.sortCriteria.indexOf(this.searchEngine.value)));
    //this.uniqueSearchIndex =  [...new Set(userTopTenList.map(item => item.searchIndex))];
  }

  close(){
    this.searchEngine.patchValue("");
    this.showDropDown =true;
  }

  search(){ 
    if(this.searchEngine.value != ""){
      this.showDropDown =false; 
      this.getTotalCount();
      this.searchTerm.term = this.searchEngine.value.toLowerCase();
      this.getUserDetails();
      this.smartSearchRef.nativeElement.blur();

    }
  }

  onClickedOutside(event){
     this.showDropDown =false; 
  }

  getTotalCount(){

    this.searchTerm.term = this.searchEngine.value.toLowerCase();
    this.searchTerm.pageNo = 0;
    this.searchEngineService.getTotalCount(this.searchTerm).subscribe(response =>{
      this.searchEngineService._totalPages.next(response);
    });
  }

  getDataForEmployee(searchCriteria : string){
      this.showDropDown =false;
        this.searchEngine.patchValue(searchCriteria , {emitEvent : false});
        this.searchTerm.term = this.searchEngine.value.toLowerCase();
        this.getTotalCount();
        this.getUserDetails();
  }

  getUserDetails(){
    this.searchEngineService.getUserDetails(this.searchTerm).subscribe(response => {
      this.searchEngineService._searchPageResults.next(response);
    },(error) => {
      alert("error occured while fetching user details");
    })
  }

  onFocus(){
    this.showDropDown =true;
  }
}
