import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'
import { IslandsService } from '.././islands.service';

@Component({
  selector: 'app-islands-menu',
  templateUrl: './islands-menu.component.html',
  styleUrls: ['.././app.component.css', './islands-menu.component.css']
})
export class IslandsMenuComponent implements OnInit {
  errorMessage = false;
  zeroValueErrorMessage = false;
  
  appRouted = false;
  rowSize;
  columnSize;  
  rawMatrixSize: string; 
  placeholder= 'Bitmap size: n, m';

  constructor(private islandsService:IslandsService, private router: RouterModule) {     
  }

  ngOnInit() {
  }

  validateBitmapSize(){
    if(!this.rawMatrixSize){
      this.errorMessage = true;
      return false;
    }

    this.rawMatrixSize = this.rawMatrixSize.trim();
    var matrixSizeProperties = this.rawMatrixSize.split(/[ ,]+/);

    if(matrixSizeProperties.length != 2){     
        this.errorMessage = true; 
        return false;      
    }   

    this.rowSize = parseInt(matrixSizeProperties[0]);
    this.columnSize = parseInt(matrixSizeProperties[1]);    

    if(this.rowSize > 0 && this.columnSize > 0){
      return true;
    }
    else{
      this.zeroValueErrorMessage = true;
      return false;
    }    
  }
  
  loadMatrix(){     
    if(!this.validateBitmapSize()){      
      return;
    }

    this.islandsService.setMatrixSize(this.rowSize, this.columnSize);   
    this.appRouted = true;
  } 

  onInputFocus(){
    this.placeholder='';
    this.errorMessage = false;
    this.zeroValueErrorMessage = false;
  }

  onInputBlur(){
    this.placeholder='Bitmap size: n, m';    
  }
}
