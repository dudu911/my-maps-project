import { Component } from '@angular/core';
import {MarkerService} from './services/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers:[MarkerService]
})
export class AppComponent {
  title: string = 'Ayeka Devices Locations';
  lat: number = -14.235004;
  lng: number = -51.925280;
  zoom: number = 2;

  markers : marker[];

  constructor(private _markerService:MarkerService){
    this.markers = this._markerService.getMarkers();
}

ngOnInit(){

  this.togglePoints(0);
  
}

// going over the markers list, zooming (if needed), centering and displaying the data label

togglePoints(index){
    if (index > this.markers.length)
      return false;
    
    this.delay(2000).then(()=>{
        this.zoom = 5;
        this.markers[index].isOpen = true;
        this.lat = this.markers[index].lat; 
        this.lng = this.markers[index].lng;
        this.delay(2000).then(()=>{
          if (this.shouldZoomOut(index))
            this.zoom = 2; 
          this.markers[index].isOpen = false;

          if (index + 1< this.markers.length)
              this.togglePoints(index+1);

    })
}); 

}

// helper function - creates a promise wrapper for settimeout, allowing me to handle the sequence of events

private delay(t) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, t)
   });
}

// determines weather we should zoom out, baed on the distance to the next marker
// under 500 KM - no need to zoomout

private shouldZoomOut(index){
    if (index >= this.markers.length - 1)
      return false; 
    
    var distanceFromNextPoint = this.getDistanceFromLatLonInKm(this.markers[index].lat, this.markers[index].lng,this.markers[index+1].lat, this.markers[index+1].lng ); 
    console.log('distanceFromNextPoint = ' + distanceFromNextPoint)
    return distanceFromNextPoint > 500;
}


// calculates distance from geo location points 

private getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

private deg2rad(deg) {
  return deg * (Math.PI/180)
}
}

  // Marker Type

  interface marker{
    name?:string; 
    lat: number, 
    lng: number; 
    isOpen: Boolean, 
    temp: string
  }
