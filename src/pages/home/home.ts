import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public creds;
  public endPoint;

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController) {
  	this.creds = {}
  	this.endPoint = 'vj.sagespidy.com'
  }

  validation() {
  	if( !this.creds.username || !this.creds.password ) {
	    let alert = this.alertCtrl.create({
		    title: 'Validation',
		    subTitle: 'Please fill username and password first',
		    buttons: ['Dismiss']
		});
		alert.present();
		return false;	
    }
    return true;
  }

  viewOutput( res ) {
  	let alert = this.alertCtrl.create({
	    title: 'Recieved',
	    subTitle: 'Username is ' + res.body.username + ' and password is ' + res.body.password,
	    buttons: ['Dismiss']
	});
	alert.present();
  }

  secureLogin() {
    if( this.validation() ) { 
    	this.http.post('https://' + this.endPoint, this.creds)
    	.subscribe(data => {
	      	console.log(data);
    		this.viewOutput( data );
	    }, err => {
	      console.log(err);
	    });
    }
  }

  login() {
    if( this.validation() ) { 
    	this.http.post('http://' + this.endPoint, this.creds)
    	.subscribe(data => {
	      console.log(data);
	      this.viewOutput( data );
	    }, err => {
	      console.log(err);
	    });
    }
  }


}
