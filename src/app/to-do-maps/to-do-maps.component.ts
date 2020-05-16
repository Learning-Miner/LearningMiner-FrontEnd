import {Component, OnInit} from '@angular/core';
import {Map} from '../models/concept-map';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'cm-to-do-maps',
  templateUrl: './to-do-maps.component.html',
  styleUrls: ['./to-do-maps.component.css']
})
export class ToDoMapsComponent implements OnInit {

  maps: Map[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getMaps('to-do').subscribe(res => {
      if (!res.Message) {
        this.maps = res;
        console.log('Mapas');
        console.log(this.maps);
      }
    }, error => {
      console.log(error);
    });
  }

  click(title: string, baseId) {
    this.userService.createMap(title, baseId).subscribe(res => {
      console.log(res);
      this.router.navigate(['/editor/' + res.id])
        .then(() => {
          window.location.reload();
        });
    }, err => {
      console.log(err);
    });
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
