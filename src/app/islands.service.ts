import { Injectable } from '@angular/core';

@Injectable()
export class IslandsService {
  matrix = [];
  rowSize = 0;
  columnSize = 0;
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

    if (j != this.rowSize - 1) {
      neighbors.push([i, j + 1]);
      if (i !== 0) {
          neighbors.push([i - 1, j + 1]);
      }
      if (i !==this.columnSize - 1) {
          neighbors.push([i + 1, j + 1]);
      }
    }
    if (i !== this.columnSize - 1) {
        neighbors.push([i + 1, j]);
        if (j !== 0){
          neighbors.push([i + 1, j - 1]);
        }
    }

    return neighbors;
  } 

  generateRandomColors(colorsAmount){
    var colors = ['white', 'black'];
    var letters = '0123456789ABCDEF';
    for(var i = 0; i < colorsAmount; i++){
      var color = '#';
      for (var j = 0; j < 6; j++){
        color += letters[Math.floor(Math.random() * 16)];
      }

      if(color === '#000000' || color === 'FFFFFF'){
        i--;
      }
      else{
        colors.push(color);        
      }
    }

    return colors;
  }

  getEmptyIslandsMatrix(){
    var result = [];

    for (var i = 0; i<this.columnSize; i++){
      var row = [];
      for (var j= 0; j<this.rowSize; j++){        
        row.push(0);        
      }    
      result.push(row);
    }

    this.matrix = result;
    return result;
  }  

  findIslands(){
    var result = {numOfIslands: 0, matrix:[]};  

    for (var i = 0; i < this.columnSize; i++) {
        for (var j = 0; j < this.rowSize; j++) {
            if (this.matrix[i][j] === 1) {
                this.searchAroundPixel(i, j);
                this.matrix[i][j] = this.islandsCounter;
                this.islandsCounter++;
            }
        }
    }

    result.numOfIslands = this.islandsCounter - 2;
    result.matrix = this.matrix;
    return result;
  }


  
  searchAroundPixel(n, m) {
    var neighbors = this.findNeighbors(n, m);

    for (var i = 0; i < neighbors.length; i++) {
        var nElement = (neighbors[i])[0];
        var mElement = (neighbors[i])[1];

        if (this.matrix[nElement][mElement] === 1) {
            this.matrix[nElement][mElement] = this.islandsCounter;
            this.searchAroundPixel(nElement, mElement);
        }
    }
  }

  findNeighbors(i, j) {
    var neighbors = [];

    if (i !== 0) {
        neighbors.push([i - 1, j]);
        if (j != 0) {
            neighbors.push([i - 1, j - 1]);
        }
        if (j != this.rowSize-1) {
            neighbors.push([i - 1, j + 1]);
        }
    }
    if (i !== this.columnSize-1) {
        neighbors.push([i + 1, j]);
        if (j != 0) {
            neighbors.push([i + 1, j - 1]);
        }
        if (j != this.rowSize-1) {
            neighbors.push([i + 1, j + 1]);
        }
    }
    if (j != 0){
        neighbors.push([i, j - 1]);
    }
    if (j != this.rowSize-1) {
        neighbors.push([i, j + 1]);
    }

    return neighbors;
  }
}
