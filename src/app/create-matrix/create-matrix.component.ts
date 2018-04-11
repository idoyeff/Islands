import { Component, OnInit } from '@angular/core';
import { IslandsService } from '.././islands.service';
import { UtilitiesService } from '.././utilities.service';

@Component({
  selector: 'app-create-matrix',
  templateUrl: './create-matrix.component.html',
  styleUrls: ['.././app.component.css', './create-matrix.component.css']
})
export class CreateMatrixComponent implements OnInit {
  matrix = [];
  tableMarginTop:string;  
  islandsFound = -1;
  appRouted = true;
  randomColors: string[] = ['white', 'black'];
  overCurrentCell = [-1, -1];
  problemSolved = false;

  constructor(private islandsService:IslandsService, private utilitiesService:UtilitiesService) { }

  ngOnInit() {
    this.matrix = this.islandsService.getEmptyIslandsMatrix();
    this.tableMarginTop = this.islandsService.getMarginTopProperty();
  }

  solve(){    
    var result = this.islandsService.findIslands();
    this.islandsFound = result.numOfIslands;
    this.matrix = result.matrix;

    this.randomColors = this.utilitiesService.generateRandomColors(this.islandsFound);
    this.problemSolved = true;
  }

  clean(){
    this.islandsFound = -1;
    this.overCurrentCell = [-1, -1];
    this.islandsService.initializeSolution();
    this.matrix = this.islandsService.getEmptyIslandsMatrix();
    this.problemSolved = false;
  }

  restart(){
    this.islandsService.restart();
  }

  getColor(islandNumber){
    return this.randomColors[islandNumber];
  } 

  cellClicked(i, j){
    if(!this.problemSolved) {
      this.matrix[i][j] = this.matrix[i][j] === 0? 1 : 0;
    }
  }

  drawCells(i, j, event){
    if(!this.problemSolved) {
      if(event.buttons === 1 && (this.overCurrentCell[0] != i || this.overCurrentCell[1] != j)){
        if(this.matrix[i][j] === 0){
          this.matrix[i][j] = 1;    
        }
      this.overCurrentCell[0] = i;
      this.overCurrentCell[1] = j ; 
      }
    }
  }
}
