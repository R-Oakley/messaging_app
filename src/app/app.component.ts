import { Component, OnInit } from '@angular/core';
import * as socketIO from "socket.io-client";
import { Socket } from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  // private SOCKET_IO_URL:string = "http://localhost:8080";
  // private socket:socketIO.Socket
  // The socket object to rep the socket between client and server
  private socket:Socket;

  // The input message from the user
  public input:string;

  public messages:string[] = [];

  ngOnInit():void {
    // Connect to the socket.io server
    // this.socket = socketIO.connect(this.SOCKET_IO_URL);
    this.socket = socketIO.connect();

    // wire up and event listener to listen for the data received
    this.socket.on("dataReceived", (data) => {
      console.log("Received from server: " + data.message);

      // save the message in an array
      this.messages.unshift(data.message);
    });

  }

  public submit() {

    // User click the OK button
    this.socket.emit("dataSent",{"message": this.input});
    this.input = "";

  }

}
