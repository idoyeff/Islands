import { Component, OnInit } from '@angular/core';
import { IslandsService } from '.././islands.service';

@Component({
  selector: 'app-create-matrix',
  templateUrl: './create-matrix.component.html',
  styleUrls: ['./create-matrix.component.css']
})
export class CreateMatrixComponent implements OnInit {
  matrix = [];
  islandsFound = 0;
  appRouted = true;
  randomColors: string[] = ['white', 'black'];

  constructor(private islandsService:IslandsService) { }

  ngOnInit() {
    this.matrix = this.islandsService.getEmptyIslandsMatrix();
  }

  solve(){
    var result = this.islandsService.findIslands();
    this.islandsFound = result.numOfIslands;
    this.matrix = result.matrix;

    this.randomColors = this.islandsService.generateRandomColors(this.islandsFound);
  }

  getColor(islandNumber){
    return this.randomColors[islandNumber];
  } 

  markCell(i, j){
    this.matrix[i][j] = this.matrix[i][j] === 0? 1 : 0;
  }
}
