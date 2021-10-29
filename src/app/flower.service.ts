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
        this.http.post(this.url, f);
        return f;
        // return this.http.post(this.url, f);
    }

    deleteFlower(f:any){
        let result = confirm("Are you sure you want to delete?");
        if(result) {
            this.http.delete(this.url + '/'+f.id);
            return f;

        }
        return null;
    }

    updateFlower(idx:any, f:any){
        this.http.put(this.url+'/'+idx, f);
        // console.log(f);
        return f;
        // return this.http.put(this.url+'/'+idx, f);
    }

    getCurrentFlower(id:any){
        return this.http.get(this.url +'/'+id);
    }
}