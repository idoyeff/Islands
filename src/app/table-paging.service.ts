import { Injectable } from '@angular/core';

@Injectable()
export class TablePagingService {

  pagingObj = {
    currentTopRow: 0, 
    currentLeftColumn: 0, 
    maxItemDisplayed: 25,
    totalRows: 0,    
    totalColumns: 0    
  }
  desplayedMatrix;
  matrix = [];

  constructor() { }

  setPage(direction){
    switch (direction){
      case 'up':
        this.pagingObj.currentTopRow--;
        break;
      case 'down':
        this.pagingObj.currentTopRow++;
        break;
      case 'left':
        this.pagingObj.currentLeftColumn--;
        break;
      case 'right':
        this.pagingObj.currentLeftColumn++;        
        break;
    }

    return this.calculateData();
  }

  setPageByKey(keyCode){
    var dataChanged = false;
    switch (keyCode){
      case 38:
        if(this.pagingObj.currentTopRow !== 0){
          this.pagingObj.currentTopRow--;
          dataChanged = true;
        }
        break;
      case 40:
        if(this.pagingObj.currentTopRow + this.pagingObj.maxItemDisplayed !== this.pagingObj.totalRows){
          this.pagingObj.currentTopRow++;
          dataChanged = true;          
        }
        break;
      case 37:
        if(this.pagingObj.currentLeftColumn !== 0){
          this.pagingObj.currentLeftColumn--;
          dataChanged = true;
        }
        break;
      case 39:
        if(this.pagingObj.currentLeftColumn + this.pagingObj.maxItemDisplayed !== this.pagingObj.totalColumns){
          this.pagingObj.currentLeftColumn++;        
          dataChanged = true;          
        }
        break;
    }

    if (dataChanged){
      return this.calculateData();      
    }
    else{
      return this.desplayedMatrix;
    }
  }

  initializeTablePaging(matrix){
    this.pagingObj = {
      currentTopRow: 0, 
      currentLeftColumn: 0, 
      maxItemDisplayed: 25,
      totalRows: 0,    
      totalColumns: 0    
    }
    this.matrix = matrix;
    this.pagingObj.totalRows = this.matrix.length;
    this.pagingObj.totalColumns = this.matrix[0].length;   

    return this.calculateData();
  }

  calculateData(){
    this.desplayedMatrix = this.matrix.slice(this.pagingObj.currentTopRow, this.pagingObj.currentTopRow + this.pagingObj.maxItemDisplayed); 
    if(this.matrix[0].length > this.pagingObj.maxItemDisplayed){
      var maxRightColumn = Math.min(this.pagingObj.maxItemDisplayed, this.pagingObj.totalRows);
      for (var i = 0; i<maxRightColumn; i++){
        this.desplayedMatrix[i] = this.desplayedMatrix[i].slice(this.pagingObj.currentLeftColumn, this.pagingObj.currentLeftColumn + this.pagingObj.maxItemDisplayed)
      }
    } 
    return this.desplayedMatrix;  
  }

  clean(){
    this.pagingObj.currentTopRow = 0;
    this.pagingObj.currentLeftColumn = 0;  
    return this.calculateData();    
  }

  getPagingObj(){
    return this.pagingObj;
  }
}
