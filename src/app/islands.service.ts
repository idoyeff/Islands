import { Injectable } from '@angular/core';
import { MatrixGeneratorService } from './matrix-generator.service';

@Injectable()
export class IslandsService {
  matrix = [];
  rowSize = 0;
  columnSize = 0;
  islandsCounter = 2;  

  constructor(private matrixGeneratorService:MatrixGeneratorService) { }

  getRandomIslandsMatrix() {
    this.matrix = this.matrixGeneratorService.getMatrixWithRandomBinary(this.rowSize, this.columnSize);
    return this.matrix;    
  }

  getEmptyIslandsMatrix(){
    this.matrix = this.matrixGeneratorService.getEmptyMatrix(this.rowSize, this.columnSize);
    return this.matrix;  
  }

  shuffleMatrix(){
    this.initializeSolution();
    return this.getRandomIslandsMatrix();
  }

  initializeSolution(){    
    this.islandsCounter = 2;
  }

  restart(){
    this.matrix = [];
    this.rowSize = 0;
    this.columnSize = 0;
    this.islandsCounter = 2;
  }

  setMatrixSize(rowSize, columnSize){   
    this.rowSize = rowSize;
    this.columnSize = columnSize; 
  }  

  getMarginTopProperty(){
      var tableHeight = 21 * this.columnSize + 10;
      if (tableHeight > 600){
        tableHeight = 600;
      }
      
      return (300 - tableHeight / 2) + 'px';
  }

  findIslands() {
    var queue = [];
    var result = { numOfIslands: 0, matrix: [] };

    for (var i = 0; i < this.columnSize; i++) {
        for (var j = 0; j < this.rowSize; j++) {
            if (this.matrix[i][j] === 1) {
                queue.push([i, j]);

                while (queue.length != 0){
                    var cell = queue.pop();
                    this.matrix[cell[0]][cell[1]] = this.islandsCounter;
                    var markedNeighbors = this.findMarkedNeighbors(cell[0], cell[1]);
                    for (var k = 0; k < markedNeighbors.length; k++) {                       
                      queue.push([(markedNeighbors[k])[0], (markedNeighbors[k])[1]]);
                    }
                } 

                this.islandsCounter++;
            }
        }
    }

    result.numOfIslands = this.islandsCounter - 2;
    result.matrix = this.matrix;
    return result;
  }

  findMarkedNeighbors(i, j) {
      var neighbors = [];

      if (i !== 0) {
          if(this.matrix[i - 1][j] === 1){
            neighbors.push([i - 1, j]);
          } 
         
          if (j != 0) {
            if(this.matrix[i - 1][j - 1] === 1){
              neighbors.push([i - 1, j - 1]);
            } 
          }
          if (j != this.rowSize - 1) {
            if(this.matrix[i - 1][j + 1] === 1){
              neighbors.push([i - 1, j + 1]);
            } 
          }
      }

      if (i !== this.columnSize - 1) {
          if(this.matrix[i + 1][j] === 1){
            neighbors.push([i + 1, j]);
          }
         
          if (j != 0) {
            if(this.matrix[i + 1][j - 1] === 1){
              neighbors.push([i + 1, j - 1]);
            }              
          }
          if (j != this.rowSize - 1) {
            if(this.matrix[i + 1][j + 1] === 1){
              neighbors.push([i + 1, j + 1]);
            }                
          }
      }
      if (j != 0) {
        if(this.matrix[i][j - 1] === 1){
          neighbors.push([i, j - 1]);
        }         
      }
      if (j != this.rowSize - 1) {
        if(this.matrix[i][j + 1] === 1){
          neighbors.push([i, j + 1]);
        }           
      }

      return neighbors;
  }

  /*recursive solution*/
  /*findIslands(){
    this.initializeSolution();    
    var result = {numOfIslands: 0, matrix:[]};  

    for (var i = 0; i < this.columnSize; i++) {
        for (var j = 0; j < this.rowSize; j++) {
            if (this.matrix[i][j] === 1) {
                this.searchAroundCell(i, j);
                this.matrix[i][j] = this.islandsCounter;
                this.islandsCounter++;
            }
        }
    }

    result.numOfIslands = this.islandsCounter - 2;
    result.matrix = this.matrix;
    return result;
  }
  
  searchAroundCell(n, m) {
    var neighbors = this.findNeighbors(n, m);

    for (var i = 0; i < neighbors.length; i++) {
        var nElement = (neighbors[i])[0];
        var mElement = (neighbors[i])[1];

        if (this.matrix[nElement][mElement] === 1) {
            this.matrix[nElement][mElement] = this.islandsCounter;
            this.searchAroundCell(nElement, mElement);
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
  }*/
}
