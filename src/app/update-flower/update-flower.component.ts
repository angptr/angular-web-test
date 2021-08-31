import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FlowerService } from "../flower.service";

@Component({
    selector: 'update-flower-posts',
    templateUrl: './update-flower.component.html'
    // styleUrls: ['./flower.component.css']
})
export class UpdateFlowerComponent{
    constructor(private service:FlowerService, private route: ActivatedRoute, private router: Router){}

    updateFlowerForm = new FormGroup({
        name:new FormControl(),
        origin:new FormControl()
    });

    flower:any;
    idx:any;

    ngOnInit(){        
        this.idx = this.route.snapshot.paramMap.get('id'); 
        this.service.getCurrentFlower(this.idx).subscribe(response => {
            this.flower = response;
            this.updateFlowerForm = new FormGroup({
                name:new FormControl(this.flower['name']),
                origin:new FormControl(this.flower['origin']) 
            });                        
        });        
    }

    update(){
        this.service.updateFlower(this.idx, this.updateFlowerForm.value).subscribe(response => {
            alert('Update flower successfully!');
            this.router.navigateByUrl('');
        });        
    }
}