import {Component, OnInit} from '@angular/core';
import {Map} from '../models/concept-map';
import {UserService} from '../services/user.service';

@Component({
  selector: 'cm-done-maps',
  templateUrl: './done-maps.component.html',
  styleUrls: ['./done-maps.component.css']
})
export class DoneMapsComponent implements OnInit {

  maps: Map[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getMaps('done').subscribe(res => {
      if (!res.Message) {
        this.maps = res;
        console.log('Mapas');
        console.log(this.maps);
      }
    }, error => {
      console.log(error);
    });
  }

  click(mapId, baseId) {
    localStorage.setItem('mapId', mapId);
    localStorage.setItem('baseId', baseId);
  }

  remove(mapId) {
    this.userService.deleteMap(mapId).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    window.location.reload();
  }

}
