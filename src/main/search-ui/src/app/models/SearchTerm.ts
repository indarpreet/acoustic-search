import { ObservableInput } from 'rxjs';

export class SearchTerm {
    term : string;
    pageNo : number;
    limit : number;

    constructor(){
        this.limit = 10;
    }
}