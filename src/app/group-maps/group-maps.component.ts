import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'cm-group-maps',
  templateUrl: './group-maps.component.html',
  styleUrls: ['./group-maps.component.css']
})
export class GroupMapsComponent implements OnInit {

  baseId = '';
  maps: Array<any> = [];

  constructor(
    private service: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.baseId = this.route.snapshot.params.baseId;
    this.service.getGroupReport(this.baseId).subscribe(res => {
      for (const id of res[0].group_maps) {
        this.service.getMap(id.$oid).subscribe(tasks => {
          console.log(tasks);
          this.maps.push(tasks);
        });
      }
    });
  }

  storeMap(id) {
    localStorage.setItem('mapId', id);
  }
}
