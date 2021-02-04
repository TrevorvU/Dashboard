import { Component, OnInit } from '@angular/core';
import { Server } from 'src/app/shared/server';

const SAMPLE_SERVERS = [
  {id: 1, name: 'dev-web', isOnline: true},
  {id: 2, name: 'dev-mail', isOnline: false},
  {id: 3, name: 'prod-web', isOnline: true},
  {id: 4, name: 'prod-mail', isOnline: true},
]

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
  servers: Server[] = SAMPLE_SERVERS;


  constructor() { }

  ngOnInit(): void {
  }

}
