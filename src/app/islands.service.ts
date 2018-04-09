import { Injectable } from '@angular/core';

@Injectable()
export class IslandsService {
  rowSize;
  columnSize;
  constructor() { }

  getRandomIslandsMatrix(rowSize, columnSize) {
    var matrix = [];

    for (var i = 0; i<columnSize; i++){
      var row = [];
      for (var j= 0; j<rowSize; j++){        
        row.push(Math.round(Math.random()));        
      }    
      matrix.push(row);
    }

    return matrix;
  }

  setMatrixSize(rowSize, columnSize){
    this.rowSize = rowSize;
    this.columnSize = columnSize;    
  }

}
