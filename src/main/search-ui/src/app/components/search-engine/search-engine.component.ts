import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import {
  debounceTime,
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
  eventTriggerd : {searchTerm : string , searchEvent : boolean};

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
      debounceTime(2000),
      switchMap((searchTerm) => {
        this.searchTerm.term = searchTerm.toLowerCase();
        this.searchTerm.pageNo = 0;
        this.searchTerm.updateId = null;
        return this.searchEngineService.getSearchResults(this.searchTerm);
      })
    );

    typeahead.subscribe(
      (response) => {
        this.showDropDown =true;
        this.userTopTenList = response;
        // Event already triggered and user is waiting for response.
        if(this.eventTriggerd && this.eventTriggerd.searchTerm == this.searchEngine.value && this.eventTriggerd.searchEvent){
          this.searchEngineService._searchPageResults.next(this.userTopTenList);
          
        }
      },
      (error) => {}
    );
  }

  close(){
    this.searchEngine.patchValue("");
    this.showDropDown =true;
  }

  search(){ 
    if(this.searchEngine.value != ""){
      this.eventTriggerd = { searchEvent : true , searchTerm :  this.searchEngine.value};
      this.showDropDown =false; 
      this.getTotalCount();
      this.searchEngineService._searchPageResults.next(this.userTopTenList);
    }
  }

  onClickedOutside(event){
     this.showDropDown =false; 
  }

  getTotalCount(){
    this.searchTerm.term = this.searchEngine.value.toLowerCase();
    this.searchEngineService.getTotalCount(this.searchTerm).subscribe(response =>{
      this.searchEngineService._totalPages.next(response);
    });
  }

  getDataForEmployee(employee : UserDetails){
      const userDetails = this.userTopTenList.find(item => item.id == employee.id);
      this.searchEngineService._searchPageResults.next([userDetails]);
      this.searchEngineService._totalPages.next(1);
      this.showDropDown =false;
      this.searchEngine.patchValue(employee.searchIndex , {emitEvent : false});
      this.searchTerm.term = employee.searchIndex.toLowerCase();
      this.searchTerm.updateId = employee.id
      this.searchEngineService.getSearchResults(this.searchTerm).subscribe(data => {
        this.userTopTenList = data;
      })

  }

  onFocus(){
    this.showDropDown =true;
  }
}
