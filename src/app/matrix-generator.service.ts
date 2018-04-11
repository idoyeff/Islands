import { Injectable } from '@angular/core';

@Injectable()
export class MatrixGeneratorService {

  constructor() { }

  getMatrixWithRandomBinary(rowSize, columnSize) {
    var result = [];

    for (var i = 0; i<columnSize; i++){
      var row = [];
      for (var j= 0; j<rowSize; j++){        
        row.push(Math.round(Math.random()));        
      }    
      result.push(row);
    }

    return result;
  }

  getEmptyMatrix(rowSize, columnSize) {
    var result = [];

    for (var i = 0; i<columnSize; i++){
      var row = [];
      for (var j= 0; j<rowSize; j++){        
        row.push(0);        
      }    
      result.push(row);
    }
        
    return result;
  }

}
