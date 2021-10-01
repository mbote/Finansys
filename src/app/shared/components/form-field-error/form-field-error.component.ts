import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl!: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage())
      return this.getErrorMessage();
    else
      return null;
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors?.required)
      return "Dados obrigatorios";
    else if (this.formControl.errors?.minlegth) {
      const requiredLength = this.formControl.errors?.minlegth.requiredLegth;
      return `deve ter no mínimo ${requiredLength} caracteres`;
    } else if (this.formControl.errors?.maxlegth) {
      const requiredLength = this.formControl.errors?.maxlegth.requiredLegth;
      return `deve ter no maximo ${requiredLength} caracteres`;
    } else {
      return null;
    }
  }

}
