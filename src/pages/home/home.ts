import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public creds;
  public endPoint;

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController, private storage: Storage) {
  	this.creds = {}
  	this.endPoint = 'vj.mehla.in'
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
      this.storage.get('token').then((token) => {
        if( !token ) {
          token = '';
        }
        console.log( '->',token );
        this.http.post('https://' + this.endPoint, this.creds, {
          headers: { 'token':  token }
        })
        .subscribe(data => {
          console.log(data);
          this.viewOutput( data );
        }, err => {
          if( err.status === 403 ) {
            let alert = this.alertCtrl.create({
                title: 'Auth',
                subTitle: 'Authorization failed. Please register first to get the token',
                buttons: ['Dismiss']
            });
            alert.present();
          }
        });
      })
    }
  }

  login() {
    if( this.validation() ) { 
      this.storage.get('token').then((token) => {
        if( !token ) {
          token = '';
        }
        console.log( '->',token );
        this.http.post('http://' + this.endPoint, this.creds, {
          headers: { 'token':  token }
        })
        .subscribe(data => {
          console.log(data);
          this.viewOutput( data );
        }, err => {
          if( err.status === 403 ) {
            let alert = this.alertCtrl.create({
                title: 'Auth',
                subTitle: 'Authorization failed. Please register first',
                buttons: ['Dismiss']
            });
            alert.present();
          }
        });
      })
    }
  }

  clearTokens() {
    this.storage.clear();
  }


}
