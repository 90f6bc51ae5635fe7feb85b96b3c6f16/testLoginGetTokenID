import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
declare var FCMPlugin;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  firestore = firebase.database().ref('/pushtokens');
  firemsg = firebase.database().ref('/messages')
  constructor(public navCtrl: NavController, public afd: AngularFireDatabase) {
    this.tokensetup().then((token) => {
      this.storetoken(token);
    });
  }
  ioViewDidLoad() {
    FCMPlugin.onNotification(function (data) {
      if (data.wasTapped) {
        alert(JSON.stringify(data));
      } else {
        alert(JSON.stringify(data));
      }
    });
    FCMPlugin.onTokenRefresh(function (token) {
      alert(token);
    });
  }
  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function (token) {
        resolve(token);
      }, (err) => {
        reject(err);
      });
    })
    return promise;
  }
  storetoken(t) {
    this.afd.list(this.firestore).push({
      uid: firebase.auth().currentUser.uid,
      devtoke: t
    }).then(() => {
      alert('Token stored');
    })
    this.afd.list(this.firemsg).push({
      sendername:'vicent',
      messages:'hello'
    }).then(()=>{
      alert('Message stored');
    })
  }

}
