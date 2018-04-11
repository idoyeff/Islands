import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { IslandsService } from '.././islands.service';
import { UtilitiesService } from '.././utilities.service';

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

  constructor(private islandsService:IslandsService, private utilitiesService:UtilitiesService, private elementRef:ElementRef) { }

  ngOnInit() {
    this.matrix = this.islandsService.getRandomIslandsMatrix();
    this.tableMarginTop = this.islandsService.getMarginTopProperty();
  }

  solve(){
    var result = this.islandsService.findIslands();
    this.islandsFound = result.numOfIslands;
    this.matrix = result.matrix;

    this.randomColors = this.utilitiesService.generateRandomColors(this.islandsFound);
  }

  getColor(islandNumber){
    return this.randomColors[islandNumber];
  } 

  shuffleMatrix(){
    this.islandsFound = -1;
    this.matrix = this.islandsService.shuffleMatrix();    
  }
  
  restart(){
    this.islandsService.restart();
  }
}
