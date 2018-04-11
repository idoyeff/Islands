import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor() { }

  generateRandomColors(colorsAmount){
    var colors = ['white', 'black'];
    var letters = '0123456789ABCDEF';
    for(var i = 0; i < colorsAmount; i++){
      var color = '#';
      for (var j = 0; j < 6; j++){
        color += letters[Math.floor(Math.random() * 16)];
      }

      if(color === '#000000' || color === 'FFFFFF'){
        i--;
      }
      else{
        colors.push(color);        
      }
    }

    return colors;
  }
}
