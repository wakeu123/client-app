import { CommonModule } from "@angular/common";
import { InputTextModule } from "primeng/inputtext";
import { Component, forwardRef, inject, Injector, input, OnInit } from "@angular/core";
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, NgControl, NgModel, Validators } from "@angular/forms";
import { BaseControlValueAccessor } from "../base-control-value-accessor";

@Component({
    selector: 'input-widget',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule],
    template: `
    <div class="container">
        <label [for]="id()" [ngClass]="{ required: required() || control !=undefined && control.hasValidator(Validators.required)}">{{ label() }}</label>
        <input 
            [id]="id()"
            #inputRef 
            pInputText 
            [type]="type()" 
            [value]="value"
            (focus)="onTouch()"
            [disabled]="isde()"
            [placeholder]="placeholder()" 
            (input)="onChange(inputRef.value)" />
    </div>
    <div class="error-container">
        @if(control != undefined && control.touched) {
            <ng-content select="[slot=error]" />
        }
    </div>
    `,
    styleUrls: ['./input-widget.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputWidgetComponent),
            multi: true
        }
    ]
})
export class InputWidgetComponent extends BaseControlValueAccessor<string> {
    
    label = input<string>();
    isde = input<boolean>(false);
    id = input.required<string>();
    placeholder = input<string>('');
    type = input.required<string>();
    required = input<boolean>(false);

    protected readonly Validators = Validators;    

}