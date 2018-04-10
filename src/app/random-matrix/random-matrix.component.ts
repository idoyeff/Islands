import { Component, OnInit } from '@angular/core';
import { IslandsService } from '.././islands.service';

@Component({
  selector: 'app-random-matrix',
  templateUrl: './random-matrix.component.html',
  styleUrls: ['./random-matrix.component.css']
})
export class RandomMatrixComponent implements OnInit {
  matrix = [];
  islandsFound = 0;
  appRouted = true;
  randomColors: string[] = ['white', 'black'];

  constructor(private islandsService:IslandsService) { }

  ngOnInit() {
    this.matrix = this.islandsService.getRandomIslandsMatrix();
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
}
