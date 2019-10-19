import { Injectable, ComponentFactory, Component, NgModule, Input } from '@angular/core'
import { Compiler } from '@angular/core';
import { CommonModule }  from "@angular/common";

export interface IDataViewer { 
    data: any;
}

@Injectable()
export class DynamicTypeBuilder {
    constructor(private compiler: Compiler){}
    public getComponentFactory(template: string) :Promise<ComponentFactory<IDataViewer>> {
        @Component({
            selector: 'dynamic-component',
            template: template,
        })
        class DynamicComponentFromTemplate  implements IDataViewer {
            @Input()  public data: any;
        };
        
        @NgModule({
            declarations: [ DynamicComponentFromTemplate ],
            imports: [CommonModule]
        })
        class RuntimeComponentModule {}
        
        return new Promise((resolve) => {
            this.compiler
            .compileModuleAndAllComponentsAsync(RuntimeComponentModule)
            .then((moduleWithFactories) =>
            {
                let factory = moduleWithFactories.componentFactories.find( (f) =>  f.componentType == DynamicComponentFromTemplate );
                resolve(factory);
            });
        });
    }
}