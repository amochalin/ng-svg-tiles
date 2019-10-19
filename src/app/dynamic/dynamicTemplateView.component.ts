import { Component, ComponentRef,ViewChild,ViewContainerRef, AfterViewInit, OnChanges, Input }   from '@angular/core';
import { IDataViewer, DynamicTypeBuilder } from './typeBuilder';

@Component({
	selector: 'dynamic-view',
	template: `
<div>
	<div #compiledTemplatePlaceHolder></div>
</div>
`,
})
export class DynamicTemplateView implements AfterViewInit, OnChanges {
	@ViewChild('compiledTemplatePlaceHolder', {read: ViewContainerRef, static: true}) 
    protected placeholder: ViewContainerRef;
	
	protected insertedComponentRef: ComponentRef<IDataViewer>;
	
	@Input()
	public data: any;
	
	@Input() 
	public template: string;
	
	constructor(protected typeBuilder: DynamicTypeBuilder) {}
	
	private initialized = false;
	
	protected renderTemplateToPlaceholder(template) {
	    if (this.insertedComponentRef) {
	        this.insertedComponentRef.destroy();
	    }
	    
	    return this.typeBuilder.getComponentFactory(template).then((factory) => {
	        this.insertedComponentRef = this.placeholder.createComponent(factory);
	        this.insertedComponentRef.instance.data = this.data;
	    });
	}
	
	public ngAfterViewInit(): void {
	    this.renderTemplateToPlaceholder(this.template).then( () => {this.initialized = true;} );
	}
	
	public ngOnChanges(): void {
	    if (!this.initialized) {
	        return;
	    }
	    console.log(this.template);
	    this.renderTemplateToPlaceholder(this.template);
	}
}