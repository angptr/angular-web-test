import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FlowerService {

    url='http://localhost:8080/flowers';

    constructor(private http: HttpClient) { }

    getAllFlowers(){
        return this.http.get(this.url);
    }

    addFlower(f:any){
        return this.http.post(this.url, f);
    }

    deleteFlower(f:any){
        let result = confirm("Are you sure you want to delete?");
        if(result) {
            return this.http.delete(this.url + '/'+f.id);                
        }
        return null;
    }

    updateFlower(idx:any, f:any){
        return this.http.put(this.url+'/'+idx, f);
    }

    getCurrentFlower(id:any){
        return this.http.get(this.url +'/'+id);
    }
}