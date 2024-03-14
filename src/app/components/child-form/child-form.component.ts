import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { DynamicFormComponent } from "../dynamic-form/dynamic-form.component";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.css']
})
export class ChildFormComponent implements OnInit {
field: FieldConfig;
group: FormGroup;

constructor() {}
ngOnInit() {
  // this.regConfig = this.field.fields;
  // console.log(this.group);
  // this.group.valueChanges.subscribe(x => {
  //   console.log("child form",x);
  // });
}

// submit(event){
//   console.log(this.group,event);
//   this.group["controls"]["childForm"].patchValue([event]);
// }

// assignForm(event){
//   this.group = event;
//   console.log(event);
// }

}