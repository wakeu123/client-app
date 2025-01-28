import { inject, Injectable, Injector, OnInit } from "@angular/core";
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, NgModel } from "@angular/forms";

@Injectable()
export abstract class BaseControlValueAccessor<T> implements ControlValueAccessor, OnInit {
    
    injector = inject(Injector);

    protected value!: T;
    isDisabled: boolean = false;
    protected control: FormControl | undefined = undefined;

    ngOnInit(): void {
        this.control = this.getControl();
    }

    onTouch = (): void => {
    }
    
    onChange = (value: string): void => {
    }

    writeValue(obj: T): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    private getControl(): FormControl {
        const injectedControl: NgControl = this.injector.get(NgControl);

        switch(injectedControl.constructor) {
            case NgModel:
                return (injectedControl as NgModel).control;

            case FormControlName:
                return this.injector.get(FormGroupDirective).getControl(injectedControl as FormControlName);
            
            default:
                return (injectedControl as FormControlDirective).form as FormControl;
        }
    }
}