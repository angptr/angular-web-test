import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FlowerService } from "../flower.service";

@Component({
    selector: 'flower-add',
    templateUrl: './add-flower.component.html',
    styleUrls: ['./add-flower.component.css']
})
export class AddFlowerComponent {
    constructor(private service: FlowerService, private route: ActivatedRoute, private router: Router) { }

    addFlowerForm = new FormGroup({
        name: new FormControl(),
        origin: new FormControl()
    });

    submit() {
        this.service.addFlower(this.addFlowerForm.value).subscribe(() => {
            alert('Add flower successfully!');
            this.router.navigateByUrl('');
        });
    }
}