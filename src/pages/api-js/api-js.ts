import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;

/* declare namespace checkboxes {
  let fontaines: boolean;
  let sanisettes: boolean;
} */

/**
 * Generated class for the ApiJsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-api-js',
  templateUrl: 'api-js.html',
})
export class ApiJsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  layers = new Map();

  checkboxes = {
    fontaines: false,
    sanisettes: false
  }

  kmlLayers = {
    fontaines: "https://opendata.paris.fr/explore/dataset/fontaines-a-boire/download/?format=kml&timezone=Europe/Berlin",
    sanisettes: "https://opendata.paris.fr/explore/dataset/sanisettesparis2011/download/?format=kml&timezone=Europe/Berlin"
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.checkboxes.fontaines = false;
    this.checkboxes.sanisettes = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApiJsPage');
    this.initMap();
    //this.geolocalize();
  }

  updateMap() {
    for (let idx in this.checkboxes) {
      if (this.checkboxes[idx]) {
        this.addKmlLayer(this.kmlLayers[idx]);
        console.log("add");
      } else {
        this.removeKmlLayer(this.kmlLayers[idx]);
        console.log("remove");
      }
    }
  }

  removeKmlLayer(src) {
    /* let kmlLayer = new google.maps.KmlLayer(src, {
      suppressInfoWindows: false,
      preserveViewport: true,
      map: null
    }); */
    if (this.layers.has(src)) {
      this.layers.get(src).setMap(null);
      //this.layers.delete(src);
    }

    //console.log(this.layers);

    //kmlLayer.setMap(null);
  }

  addKmlLayer(src) {
    //let src = "https://opendata.paris.fr/explore/dataset/sanisettesparis2011/download/?format=kml&timezone=Europe/Berlin";

    if (this.layers.has(src)) {
      this.layers.get(src).setMap(this.map);
    } else {
      let kmlLayer = new google.maps.KmlLayer(src, {
        suppressInfoWindows: false,
        preserveViewport: true,
        map: this.map
      });
      this.layers.set(src, kmlLayer);
    }



   /*  kmlLayer.addListener('click', function(event) {
      console.log(event);
      var content = event.featureData.infoWindowHtml;
      var testimonial = document.getElementById('capture');
      testimonial.innerHTML = content;
    }); */

    //this.directionsDisplay.setMap(this.map);
  }

  initMap() {
    let posParis = { lat: 48.86189299999999, lng: 2.34699999999998 };
    //let src = 'https://www.sanef.com/sanef/bo/kml/x_axe_zoom_08.kml?1507812379655';
    let src = "https://opendata.paris.fr/explore/dataset/autolib-disponibilite-temps-reel/download/?format=kml&timezone=Europe/Berlin";
    let fontaines = "https://opendata.paris.fr/explore/dataset/fontaines-a-boire/download/?format=kml&timezone=Europe/Berlin";
    let sanisettes = "https://opendata.paris.fr/explore/dataset/sanisettesparis2011/download/?format=kml&timezone=Europe/Berlin";

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 13,
      center: posParis
    });

/*     var kmlLayer = new google.maps.KmlLayer(src, {
      suppressInfoWindows: false,
      preserveViewport: true,
      map: this.map
    });

    kmlLayer.addListener('click', function(event) {
      console.log(event);
      var content = event.featureData.infoWindowHtml;
      var testimonial = document.getElementById('capture');
      testimonial.innerHTML = content;
    }); */

       /*  let infoWindow = new google.maps.InfoWindow({ map: map });

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found. '); */

    this.directionsDisplay.setMap(this.map);
  }

  geolocalize() {

    //navigator.geolocation.getCurrentPosition(this.success, this.error, {});
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("success");

        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        let map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 11,
          center: pos
        });

        let infoWindow = new google.maps.InfoWindow({ map: map });

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found. ');

        let marker = new google.maps.Marker({
          position: pos,
          map: map
        });
        map.setCenter(pos);

        console.log("options");
        //this.directionsDisplay.setMap(this.map);
      },
      (error) => {
        console.log(error.code);
      },
      {}
    );

/*     this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    }); */


  }

/*   error(error) {
    console.log(error.code);
  }

  success(position) {
    console.log("success");
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: position.coords.latitude, lng: position.coords.longitude}
    });
    console.log("options");
    this.directionsDisplay.setMap(this.map);

  } */

}
