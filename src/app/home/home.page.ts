import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  city = "Hulluch";
  meteo;

  constructor(
    private geolocation: Geolocation,
    private router: Router,
    private storage: Storage,
    private http: HttpClient  

    ) {}

  ngOnInit() {
   // Au chargement de l'appli on affiche les coordonnées GPS
    this.geolocation.watchPosition().subscribe((data) => {
      console.log(data);
    });
  }

    ionViewWillEnter() { 
     
    this.storage.get('city').then(city => {
    if (null !== city) this.city = city; 

    // on fait la requete ajax
    this.http
    .get('https://www.prevision-meteo.ch/services/json/'+this.city)
    .toPromise()
    .then(meteo => this.meteo = meteo);
    });
  }

  // On se rend sur le page /about
  navToAbout(){
    this.router.navigate(['/about']);
  }
}