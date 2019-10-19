import { Injectable } from '@angular/core';

@Injectable() 
export class GeneratorsFactory {
	getTilesData(config:any): Object[][] {
		var tiles = [],
			i = 0,
			rowsCount = (config && config.rowsCount) || 10,
			columnsCount = (config && config.columnsCount) || 10,
			xSpacing = (config && config.xSpacing) || 100,
			ySpacing = (config && config.ySpacing) || 100;
		while (i < rowsCount) {
			var row = [],
				j = 0;
			while (j<columnsCount) {
				row.push({
					row: i,
					col: j,
			        x: xSpacing * j,
			        y: ySpacing * i,
			        startPath: function(xOffset, yOffset) {
			            let lastX = this.x + (xOffset || 0),
			                lastY = this.y + (yOffset || 0),
			                pathCommands = ['M' + lastX + ' ' + lastY];
			            return {
			                toString: function() {
			                    return pathCommands.join(' ');
			                },
			                cAngle: function(angle, distance, startAngle, startDistance, endAngle, endDistance) {
			                    let prevX = lastX,
			                        prevY = lastY,
			                        startPoint = [prevX + Math.cos(Math.PI * (startAngle || 0) / 180) * (startDistance || 0),
			                                      prevY + Math.sin(Math.PI * (startAngle || 0) / 180) * (startDistance || 0)],
			                        endPoint = [];
			                    lastX = lastX + Math.cos(Math.PI * angle / 180) * distance;
			                    lastY = lastY + Math.sin(Math.PI * angle / 180) * distance;
			                    
			                    pathCommands.push('C ' + startPoint.join(' ') + ', '+ lastX + ' ' + lastY + ', ' + lastX + ' ' + lastY);
			                    return this;
			                }
			            };
			        }
				});
				j++;
			}
			tiles.push(row);
			i++;
		}
		return tiles;
	}
}