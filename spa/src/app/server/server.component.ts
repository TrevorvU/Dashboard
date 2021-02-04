import { Component, OnInit, Input } from '@angular/core';
import { Server } from '../shared/server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  color: string;
  buttonText: string;
  // onlineStatus: boolean;
  constructor() { }

  @Input() serverInput: Server;

  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline)
  }

  setServerStatus(isOnline: boolean) {
    if(isOnline) {
      this.serverInput.isOnline = true;
      this.color = '#2ECA60',
      this.buttonText = 'Shut Down'
    } else {
      this.serverInput.isOnline = false;
      this.color = '#ED4514',
      this.buttonText = 'Start'
    }
  }

  toggleStatus(onlineStatus: boolean) {
       this.setServerStatus(!onlineStatus);
  }
}
