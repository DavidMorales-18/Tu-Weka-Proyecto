import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
//import { DataService } from '../../services/data.service';

declare var google: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  infoWindows: any = [];
  markers: any = [
    {
        title: "National Art Gallery",
        latitude: "-17.824991",
        longitude: "31.049295"
    },
    {
        title: "West End Hospital",
        latitude: "-17.820987",
        longitude: "31.039682"
    },
    {
        title: "Dominican Convent School",
        latitude: "-17.822647",
        longitude: "31.052042"
    },
    {
        title: "Chop Chop Brazilian Steakhouse",
        latitude: "-17.819460",
        longitude: "31.053844"
    },
    {
        title: "Canadian Embassy",
        latitude: "-17.820972",
        longitude: "31.043587"
    }
  ];
  //export class AdminPage implements OnInit{
    lista:listado[]=[
      {
        name:'admin',
        redirecTo:'/admin'
      },
      {
        name:'reg-tienda',
        redirecTo:'/reg-tienda'
      },
      {
        name:'anuncios',
        redirecTo:'/anuncios'
      },
      {
        name:'login',
        redirecTo:'/login'
      }
    ]
    menu:Observable<any>;
  constructor(private menu1:MenuController) { }
  ngOnInit(): void {
    
  }
  openMenu(){
    this.menu1.toggle();
  }

  ionViewDidEnter() {
    this.showMap();
  }
  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
                              '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                              '<ion-button id="navigate">Navigate</ion-button>' +
                            '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigate').addEventListener('click', () => {
          console.log('navigate button clicked!');
          // code to navigate using google maps app
          window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude);
        });
      });

    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  showMap() {
    const location = new google.maps.LatLng(-17.824858, 31.053028);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }

}

interface listado{
  name:string;
  redirecTo:string;
}
