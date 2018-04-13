import { Component, OnInit, HostListener } from '@angular/core';
import { IslandsService } from '.././islands.service';
import { UtilitiesService } from '.././utilities.service';
import { TablePagingService } from '.././table-paging.service';

@Component({
  selector: 'app-random-matrix',
  templateUrl: './random-matrix.component.html',
  styleUrls: ['.././app.component.css', './random-matrix.component.css']
})
export class RandomMatrixComponent implements OnInit {
  matrix = [];
  tableMarginTop:string;
  islandsFound = -1;
  appRouted = true;
  randomColors: string[] = ['white', 'black'];  
  desplayedMatrix;  
  pagingObj;
  lastCellOver = [];

  constructor(private islandsService:IslandsService, private utilitiesService:UtilitiesService,  private tablePagingService:TablePagingService) { }

  ngOnInit() {
    this.matrix = this.islandsService.getRandomIslandsMatrix();
    this.tableMarginTop = this.islandsService.getMarginTopProperty();
    this.desplayedMatrix = this.tablePagingService.initializeTablePaging(this.matrix); 
    this.pagingObj = this.tablePagingService.getPagingObj();     
  }

  setPage(direction){
    this.desplayedMatrix = this.tablePagingService.setPage(direction);  
    this.pagingObj = this.tablePagingService.getPagingObj();      
  }  

  signCell(i, j){
    this.lastCellOver = [i + this.pagingObj.currentTopRow, j + this.pagingObj.currentLeftColumn];
  }

  solve(){
    var result = this.islandsService.findIslands();
    this.lastCellOver = [];
    this.islandsFound = result.numOfIslands;
    this.matrix = result.matrix;
    this.desplayedMatrix = this.tablePagingService.calculateData();          
    this.randomColors = this.utilitiesService.generateRandomColors(this.islandsFound);
  }

  getColor(islandNumber){
    return this.randomColors[islandNumber];
  } 

  shuffleMatrix(){
    this.islandsFound = -1;
    this.lastCellOver = [];
    this.matrix = this.islandsService.shuffleMatrix();    
    this.desplayedMatrix = this.tablePagingService.initializeTablePaging(this.matrix); 
    this.pagingObj = this.tablePagingService.getPagingObj();     
  }
  
  restart(){
    this.islandsService.restart();
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.desplayedMatrix = this.tablePagingService.setPageByKey(event.keyCode);
  }
}
