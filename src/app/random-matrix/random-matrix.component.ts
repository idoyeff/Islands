import { Component, OnInit } from '@angular/core';
import { IslandsService } from '.././islands.service';

@Component({
  selector: 'app-random-matrix',
  templateUrl: './random-matrix.component.html',
  styleUrls: ['./random-matrix.component.css']
})
export class RandomMatrixComponent implements OnInit {
  matrix = [];
  constructor(private islandsService:IslandsService) { }

  ngOnInit() {
    this.matrix = this.islandsService.getRandomIslandsMatrix(5,4);
  }

}
