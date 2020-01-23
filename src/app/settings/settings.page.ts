import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  city = 'Hulluch';
  constructor(private storage: Storage) { }

  ngOnInit() {
    //on recupere la Ville dans la bdd
    this.storage.get('city').then(city => {
      if (null !== city) this.city = city;  
    });
  }

  save () {
    //on enregistre la ville
    this.storage.set('city', this.city);
  }
}
