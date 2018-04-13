import { Injectable } from '@angular/core';
import { MatrixGeneratorService } from './matrix-generator.service';

@Injectable()
export class IslandsService {
  matrix = [];
  desplayedMatrix = [];
  rowSize = 0;
  columnSize = 0;
  islandsCounter = 2;  
  maxItemDisplayed = 90;
  currentPage = 0;
  currentLeftPage = 0;
  scrollLeftPosition = 0;
  scrollTopPosition = 0;  
  numOfTopPages = 0;
  numOfLeftPages = 0;  
  resultObj = {desplayedMatrix: [], displayCell: 0, currentPage: 0};

  constructor(private matrixGeneratorService:MatrixGeneratorService) { }

  getRandomIslandsMatrix() {
    this.matrix = this.matrixGeneratorService.getMatrixWithRandomBinary(this.rowSize, this.columnSize);
    this.numOfTopPages = this.matrix.length;
    this.numOfLeftPages = this.matrix[0].length;    
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
    this.desplayedMatrix = [];    
    this.rowSize = 0;
    this.columnSize = 0;
    this.islandsCounter = 2;
    this.currentPage = 0;
    this.currentLeftPage = 0;
    this.scrollLeftPosition = 0;
    this.scrollTopPosition = 0;
  }

  getCounter(){   
    var rowArray = [];
    var columnArray = [];
    
    for(var i=0; i<100; i++){
      rowArray.push(i);
    }

    for(var i=0; i<100; i++){
      columnArray.push(i);
    }

    return [rowArray, columnArray];
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

  tableScroll(scrollTop, scrollLeft){    
    if(this.scrollTopPosition !== scrollTop && scrollTop != 0){
      this.currentPage++;
      if(this.currentPage !== 0){
        this.resultObj.displayCell = 30;
      }

      var firstCellTop = this.currentPage * 30;
      var maxSize = Math.min(this.matrix.length, firstCellTop + 90);             
      this.resultObj.desplayedMatrix = this.matrix.slice(firstCellTop, maxSize);
      this.resultObj.currentPage = this.currentPage;

      
  
    }
    else if(this.scrollLeftPosition !== scrollLeft){


    }

    return this.resultObj;
    

    /*if(this.scrollTopPosition !== scrollTop){      
      this.scrollTopPosition = scrollTop

      var cellsHiddenTop = Math.floor(scrollTop / 21) + (this.currentPage) * 30;
      var currentPage = Math.floor(cellsHiddenTop / 30);
      if(currentPage === this.currentPage){
        return [];
      }
      this.currentPage = currentPage;
      
      var firstCellTop = (currentPage * 30) + 30;
      var maxSize = Math.min(this.matrix.length, firstCellTop + this.maxItemDisplayed);     
      return this.matrix.slice(firstCellTop, maxSize);
    }
    else if(this.scrollLeftPosition !== scrollLeft){
      this.scrollLeftPosition = scrollLeft

      var cellsHiddenLeft = Math.floor(scrollLeft / 21) + (this.currentLeftPage) * 30;
      var currentLeftPage = Math.floor(cellsHiddenLeft / 30);
      if(currentLeftPage === this.currentLeftPage){
        return [];
      }

      this.currentLeftPage = currentLeftPage;
      
      var firstCell = (currentLeftPage * 30) + 30;
      var maxSize = Math.min(this.matrix[0].length, firstCell + this.maxItemDisplayed);     

      var firstCellTop = currentPage * 30;
      var maxSizeTop = Math.min(this.matrix.length, firstCell + this.maxItemDisplayed);   

      this.desplayedMatrix = this.matrix.slice(firstCell, maxSize);

      var newMatrix = [];
      for (var i = 0; this.desplayedMatrix.length; i++){
        this.desplayedMatrix [i] = this.desplayedMatrix[i].slice(firstCell, maxSize);
      }      

      return this.desplayedMatrix;
    }*/
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
