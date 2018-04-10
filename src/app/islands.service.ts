import { Injectable } from '@angular/core';

@Injectable()
export class IslandsService {
  matrix;
  rowSize = 7;
  columnSize = 7;
  islandsCounter = 2;

  constructor() { }

  getRandomIslandsMatrix() {
    var result = [];

    for (var i = 0; i<this.columnSize; i++){
      var row = [];
      for (var j= 0; j<this.rowSize; j++){        
        row.push(Math.round(Math.random()));        
      }    
      result.push(row);
    }

    this.matrix = result;
    return result;
  }

  setMatrixSize(rowSize, columnSize){
   return new Promise(resolve => {
      this.rowSize = rowSize;
      this.columnSize = columnSize; 
    });     
  }

  findUnVisitedNeighbors(i, j) {
    var neighbors = [];

    if (j != this.columnSize - 1) {
      neighbors.push([i, j + 1]);
      if (i !== 0) {
          neighbors.push([i - 1, j + 1]);
      }
      if (i !==this.rowSize - 1) {
          neighbors.push([i + 1, j + 1]);
      }
    }
    if (i !== this.rowSize - 1) {
        neighbors.push([i + 1, j]);
    }

    return neighbors;
  }

  findIslands(){
    return new Promise((resolve, reject) => {
      var result = {numOfIslands: 0, matrix:[]};  

      for(var i = 0; i < this.columnSize; i++){
        for(var j = 0; j < this.rowSize; j++){
          if(this.matrix[i][j] > 0){
            var islandNumber = this.matrix[i][j] === 1? ++this.islandsCounter : this.matrix[i][j];
            
            var unVisitedNeighbors = this.findUnVisitedNeighbors(i, j);
            unVisitedNeighbors.forEach(function(element){
              if(this.matrix[element[0]][element[1]] === 1){
                this.matrix[element[0]][element[1]] = islandNumber
              }
            });         
          }        
        }
      }
  
      result.numOfIslands = this.islandsCounter
    });   
  } 
}
