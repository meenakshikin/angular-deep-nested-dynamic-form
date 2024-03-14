import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { FieldConfig, Validator } from "../../field.interface";

@Component({
  exportAs: "dynamicForm",
  selector: "dynamic-form",
  template: `
  <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
  <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
  </ng-container>
  </form>
  `,
  styles: []
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  form: FormGroup;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() childFG: EventEmitter<any> = new EventEmitter<any>();
  //form: FormGroup;

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createControl(this.fields);
    this.form.valueChanges.subscribe(x => {
      this.submit.emit(x);
      //this.childFG.emit(this.form);
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControl(fields) {
    console.log("fields",fields)
    const group = this.fb.group({});
    fields.forEach(field => {
      if (field.type === "button") return;
      if(field.type === "childform"){
        let items = [];
        field.formArrays.forEach(fields => {
          items.push(this.createControl(fields));
        });
        let controlArray = this.fb.array(items);
        group.addControl(field.name, controlArray);
      }else{
        const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
      }
    });
    console.log(group);
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
