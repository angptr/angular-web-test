import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FlowerService } from "../flower.service";

@Component({
    selector: 'flower',
    templateUrl: './flower.component.html',
    styleUrls: ['./flower.component.css']
})
export class FlowerComponent {
    flowers: any;

    constructor(private service: FlowerService, 
                 private router: ActivatedRoute) { }

    ngOnInit() {
        this.service.getAllFlowers().subscribe(response => {
            this.flowers = response;
        });
    }

    delete(f: any) {
        let result = this.service.deleteFlower(f);
        if (result) {
            result.subscribe(() => {
                let idx = this.flowers.indexOf(f);
                this.flowers.splice(idx, 1);
            });
        }
    }
}
