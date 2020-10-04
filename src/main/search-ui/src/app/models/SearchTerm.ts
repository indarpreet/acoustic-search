import { ObservableInput } from 'rxjs';

export class SearchTerm {
    term : string;
    pageNo : number;
    limit : number = 10;
    totalCount : number;
    updateId : number;
    private static searchTerm = new SearchTerm();
    private constructor(){
       
    }

    public static getSearchTermInstance(){
        return this.searchTerm;
    }

}