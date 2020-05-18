import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ConceptMap} from '../conceptmap-module/conceptmap/conceptmap.types';
import {Map} from '../models/concept-map';
import {Router} from '@angular/router';

@Component({
  selector: 'cm-list-maps',
  templateUrl: './list-maps.component.html',
  styleUrls: ['./list-maps.component.css']
})
export class ListMapsComponent implements OnInit {

  maps: Array<any> = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getMaps('edit').subscribe(res => {
      if (!res.Message) {
        this.maps = res;
        console.log('Mapas');
        console.log(this.maps);
      }
    }, error => {
      console.log(error);
    });
  }

  remove(mapId) {
    this.userService.deleteMap(mapId).subscribe(res => {
      console.log(res);
      window.location.reload();
    }, err => {
      console.log(err);
    });
  }

  goEditor(id) {
    localStorage.setItem('mapId', id);
    this.router.navigate(['/editor', id])
      .then(() => {
        window.location.reload();
      });
  }
}
