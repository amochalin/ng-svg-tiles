import { Component, OnInit } from '@angular/core';
import { DataTools } from './data-tools.service';
import { FormControl, FormGroup } from '@angular/forms';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor( public dataTools: DataTools ) {}
	public ngOnInit() {
		
	}
	
	tileHeight = 300;
	tileWidth = 300;
	dimensionsForm = new FormGroup({
		tileHeight: new FormControl(this.tileHeight),
		tileWidth: new FormControl(this.tileWidth),
	});
	showTileBorders = false;
	public onDimensionsSubmit() {
		this.tileHeight = parseFloat(this.dimensionsForm.value.tileHeight);
		this.tileWidth = parseFloat(this.dimensionsForm.value.tileWidth);
	}
	public composeSVGTemplate(): string {
		const tileBordersSVG = this.showTileBorders ? `
				<path d="M ${this.tileWidth-1} 0 L ${this.tileWidth-1} ${this.tileHeight-1}"
					  stroke="black"
					  stroke-dasharray="5,5"
					  stroke-width="1"
					  stroke-opacity="0.5"></path>
				<path d="M 0 ${this.tileHeight-1} L ${this.tileWidth-1} ${this.tileHeight-1}"
					  stroke="black"
					  stroke-dasharray="5,5"
					  stroke-width="1"
					  stroke-opacity="0.5"></path>
				<path d="M ${this.tileWidth-1} 5 L ${this.tileWidth-1} ${this.tileHeight-1}"
					  stroke="white"
					  stroke-dasharray="5,5"
					  stroke-width="1"
					  stroke-opacity="0.9"></path>
				<path d="M 5 ${this.tileHeight-1} L ${this.tileWidth-1} ${this.tileHeight-1}"
					  stroke="white"
					  stroke-dasharray="5,5"
					  stroke-width="1"
					  stroke-opacity="0.9"></path>
		` : '';
		return (`<div class="tiles-row" style="width:${this.tileWidth * 3}px">`+ 
			`<svg width="${this.tileWidth}" height="${this.tileHeight}">
				${this.template}
				${tileBordersSVG}
			 </svg>`.repeat(3) 
			+ '</div>')
			.repeat(3);
	}
    protected template = ` <g *ngFor = "let row of tools.generateGrid({
        rowsCount: 2,
        columnsCount: 17,
        xSpacing: 20,
        ySpacing: 300
    })">
    <path *ngFor = "let tile of row"
          stroke = "#00ffff"
          fill = "none"
          stroke-width = 13
          stroke-opacity=0.5
		  [attr.d]="tile.startPath(0, -10)
						.curveWithAngle(90, 301, 110, 120, -70, 120)
						.toString()"></path>
</g>
 <g *ngFor = "let row of tools.generateGrid({
        rowsCount: 17,
        columnsCount: 2,
        xSpacing: 300,
        ySpacing: 20
    })">
    <path *ngFor = "let tile of row"
          stroke = "#ffff00"
          fill = "none"
          stroke-width = 13
          stroke-opacity=0.5
		  [attr.d]="tile.startPath(-10, 0)
						.curveWithAngle(0, 301,- 10, 120, 170, 120)
						.toString()"></path>
</g>`;
}
