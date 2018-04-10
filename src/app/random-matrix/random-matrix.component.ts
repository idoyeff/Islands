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
  blackIslandStyle = 'background-color: black';

  constructor(private islandsService:IslandsService) { }

  ngOnInit() {
    this.matrix = this.islandsService.getRandomIslandsMatrix();
  }

  solve(){
    this.islandsService.findIslands().then(result => {
      var testResult = result;
      this.islandsFound;// = result.numOfIslands;
      this.matrix;// = result.matrix;
    });    
  }

  myEvent1(){
    this.appRouted = false;
  }

}
