import { Component, OnInit } from '@angular/core';
import { IslandsService } from '.././islands.service';

@Component({
  selector: 'app-islands-menu',
  templateUrl: './islands-menu.component.html',
  styleUrls: ['./islands-menu.component.css']
})
export class IslandsMenuComponent implements OnInit {
  errorMessage = false;
  rowSize;
  columnSize;  
  rawMatrixSize: string; 

  constructor(private islandsService:IslandsService) { 
    
  }

  ngOnInit() {
  }

  validateBitmapSize(){
    if(!this.rawMatrixSize){
      return false;
    }

    var matrixSizeProperties = this.rawMatrixSize.split(/[ ,]+/);

    if(matrixSizeProperties.length != 2){      
        return false;      
    }   

    this.rowSize = parseInt(matrixSizeProperties[0]);
    this.columnSize = parseInt(matrixSizeProperties[1]);    

    if(this.rowSize > 0 && this.columnSize > 0){
      return true;
    }

    return false;    
  }
  
  randomizeMatrix(){
    if(!this.validateBitmapSize()){
      return false;
    }
    
    //route to randomize component

  }

  createMatrix(){
    if(!this.validateBitmapSize()){
      return false;
    }
    
    //route to create component
  }  
}
