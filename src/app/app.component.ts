import { Component, OnInit } from '@angular/core';
import { DataTools } from './data-tools.service';
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
	public composeSVGTemplate(): string {

		return ('<div class="tiles-row">'+ 
			('<svg width="300" height="300">' + this.template +'</svg>')
				.repeat(3) 
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
