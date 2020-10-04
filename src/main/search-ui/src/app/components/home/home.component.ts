import { Component, OnInit } from "@angular/core";
import { SearchTerm } from 'src/app/models/SearchTerm';
import { UserDetails } from 'src/app/models/UserDetails';
import { SearchEngineService } from 'src/app/services/search-engine.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchPageResults : Array<UserDetails>;
  home : boolean = true;
  searchTerm : SearchTerm;
  noOfPages : number;
  listOfPages : Array<{id : number}> = [];
  currentPage : number;
  lowest : number;
  highest : number;
  totalCount : number;
  constructor(private searchEngineService : SearchEngineService){}
  ngOnInit(){
     this.searchEngineService._searchPageResults.subscribe(next => {
        this.searchPageResults =  next;
          this.home = false;        
     });

     this.searchEngineService._totalPages.subscribe(next => {
      this.totalCount = next;
      this.pagination(next);
    })
     
  }

   /**
   * This method is called on click of page number
   */
  getSearchResultsByPage(currentPage) {
    this.searchTerm = SearchTerm.getSearchTermInstance();
    this.currentPage = currentPage
    this.searchTerm.pageNo = this.currentPage - 1;

    if((currentPage < this.lowest || currentPage == this.lowest) && this.lowest != 1){ 
     
        this.listOfPages = [];
        
        this.highest = this.lowest;
        this.lowest = this.lowest - 10;
        if(this.lowest <= 0){
          this.lowest = 1;
        }
        for(let i = this.lowest ; i <= this.highest ; i++){
          this.listOfPages.push({id : i});
        }
       

    }else if(currentPage > this.highest || currentPage == this.highest){
      this.listOfPages = [];
      this.lowest = this.highest;
      if(this.highest + 10 > this.noOfPages){
        this.highest = this.noOfPages;
      }else{
        this.highest = this.highest + 10;
      }
      
      for(let i = this.lowest ; i <= this.highest ; i++){
        this.listOfPages.push({id : i});
      }
    }
    
    
    this.searchEngineService.getSearchResults(this.searchTerm).subscribe(
      (response) => {
        this.searchPageResults =  response;
      },
      (error) => {}
    );
  }

  

  pagination(totalCount){
    
    this.noOfPages = Math.ceil(totalCount / 10);
    this.listOfPages = [];
    if(this.noOfPages > 10){
      this.lowest = 1;
      this.highest = 10;
      for(let i = 1 ; i <= 10 ; i++){
        this.listOfPages.push({id : i});
      }
    }else{
      for(let i = 1 ; i <= this.noOfPages ; i++){
        this.listOfPages.push({id : i});
      } 
    }
    
    this.currentPage = 1;
   
  }
}
