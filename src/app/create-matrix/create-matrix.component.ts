import { Component, OnInit, HostListener } from '@angular/core';
import { IslandsService } from '.././islands.service';
import { UtilitiesService } from '.././utilities.service';
import { TablePagingService } from '.././table-paging.service';
import { VirtualScrollModule } from 'angular2-virtual-scroll'
import { RandomMatrixComponent } from '../random-matrix/random-matrix.component';

@Component({
  selector: 'app-create-matrix',
  templateUrl: './create-matrix.component.html',
  styleUrls: ['.././app.component.css', './create-matrix.component.css']
})
export class CreateMatrixComponent implements OnInit {
  matrix = [];
  rowCounter;
  columnCounter;
  tableMarginTop:string;  
  islandsFound = -1;
  appRouted = true;
  randomColors: string[] = ['white', 'black'];
  overCurrentCell = [-1, -1];
  problemSolved = false;
  desplayedMatrix;
  lastCellClicked= [];
  pagingObj;

  constructor(private islandsService:IslandsService, private utilitiesService:UtilitiesService, private tablePagingService:TablePagingService) { } 

  setKeyPage(direction, event){
    var x= 2;
  }

  ngOnInit() {
    this.matrix = this.islandsService.getEmptyIslandsMatrix();
    this.tableMarginTop = this.islandsService.getMarginTopProperty();
    this.desplayedMatrix = this.tablePagingService.initializeTablePaging(this.matrix); 
    this.pagingObj = this.tablePagingService.getPagingObj();                    
  }
  
  setPage(direction){
    this.desplayedMatrix = this.tablePagingService.setPage(direction);  
    this.pagingObj = this.tablePagingService.getPagingObj();      
  }  

  solve(){    
    var result = this.islandsService.findIslands();
    this.islandsFound = result.numOfIslands;
    this.matrix = result.matrix;
    this.randomColors = this.utilitiesService.generateRandomColors(this.islandsFound);
    this.desplayedMatrix = this.tablePagingService.calculateData();          
    this.problemSolved = true;
  }

  clean(){
    this.lastCellClicked = [];      
    this.islandsFound = -1;
    this.overCurrentCell = [-1, -1];
    this.islandsService.initializeSolution();
    this.matrix = this.islandsService.getEmptyIslandsMatrix();   
    this.desplayedMatrix = this.tablePagingService.initializeTablePaging(this.matrix);  
    this.pagingObj = this.tablePagingService.getPagingObj();       
    this.problemSolved = false;    
  }

  restart(){
    this.islandsService.restart();
  }

  getColor(islandNumber){
    return this.randomColors[islandNumber];
  } 

  cellClicked(i, j){
    this.pagingObj = this.tablePagingService.getPagingObj();
    if(!this.problemSolved) {     
      this.matrix[i + this.pagingObj.currentTopRow][j + this.pagingObj.currentLeftColumn] = this.matrix[i + this.pagingObj.currentTopRow][j + this.pagingObj.currentLeftColumn] === 0? 1 : 0;
      this.desplayedMatrix[i][j] = this.matrix[i + this.pagingObj.currentTopRow][j + this.pagingObj.currentLeftColumn];
    }

    this.lastCellClicked = [i + this.pagingObj.currentTopRow, j + this.pagingObj.currentLeftColumn];
  }

  drawCells(i, j, event){
    if(!this.problemSolved) {
      if(event.buttons === 1 && (this.overCurrentCell[0] != i || this.overCurrentCell[1] != j)){
        this.pagingObj = this.tablePagingService.getPagingObj();        
        if(this.matrix[i + this.pagingObj.currentTopRow][j + this.pagingObj.currentLeftColumn] === 0){
          this.matrix[i + this.pagingObj.currentTopRow][j + this.pagingObj.currentLeftColumn] = 1;   
          this.desplayedMatrix[i][j] = 1 
        }
      this.lastCellClicked = [i + this.pagingObj.currentTopRow, j + this.pagingObj.currentLeftColumn];
      this.overCurrentCell[0] = i;
      this.overCurrentCell[1] = j ; 
      }
    }    
  }
  
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.desplayedMatrix = this.tablePagingService.setPageByKey(event.keyCode);
  }
}
