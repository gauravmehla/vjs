import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public creds;
  public endPoint;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, private storage: Storage) {
  	this.creds = {};
  	this.endPoint = 'vj.mehla.in';
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

  signup() {
  	if( this.validation() ) {
  	    console.log( this.creds );
  	    this.http.post( 'http://' + this.endPoint + '/login', this.creds)
	    	.subscribe(( data:any ) => {
		      	console.log(data);
		      	this.storage.set('token', data.token);
            let alert = this.alertCtrl.create({
            title: 'Token Recieved',
            subTitle: 'Token is stored into localstorage',
            buttons: ['Dismiss']
        });
        alert.present();
		    }, err => {
		      console.log(err);
		    });
  	}
  }

}
