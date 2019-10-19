import { Component, OnInit } from '@angular/core';
import { GeneratorsFactory } from './generators-factory.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ GeneratorsFactory ]
})
export class AppComponent implements OnInit {
	constructor( public generatorsFactory: GeneratorsFactory ) {}
	protected data: Object;
	public ngOnInit() {
	    let generatorsFactory = this.generatorsFactory;
	    this.data = {
            generateTiles: function(config: any):Object[][] {
                return generatorsFactory.getTilesData(config);
            }
	    }
	}
	public composeSVGTemplate(): string {
	    return '<svg width="100%" height="300">' + this.template +'</svg>';
	}
    protected template = `<g *ngFor = "let row of data.generateTiles({
        rowsCount: 6,
        columnsCount: 20,
        xSpacing: 50,
        ySpacing: 50
    })">
    <path *ngFor = "let tile of row"
          [attr.fill]="['#f00','#0f0','#00f'][(tile.row+tile.col)%3]" 
          [attr.d]="tile.startPath().cAngle(0, 30, -30, 15).cAngle(90, 30, 105, 15).toString()"></path>
</g>`;
}
