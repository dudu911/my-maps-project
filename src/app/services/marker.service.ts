import {Injectable} from '@angular/core'; 
import {Init} from '../init-markers'; 

@Injectable()
export class MarkerService extends Init{
    constructor(){
        super();
        console.log('MarkerService initialized...');
        this.load(); 
    }

    getMarkers(){
        var markers = JSON.parse(localStorage.getItem('markers'));
        return markers;
    }

    addMarker(newMarker){
          var markers = JSON.parse(localStorage.getItem('markers'));
          markers.push(newMarker); 
          localStorage.setItem('markers', JSON.stringify(markers));
    }

    // validity check, for simplicity reasons - if a coordinate is not valid - it's removed from the list
    private checkValidity(markers){
            var reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");
            
            for (var i=0;i<markers.length; i++){
                if (!reg.exec(markers[i].lat) || !reg.exec(markers[i].lng))
                    markers.splice(i,1);    
            }
    }
}