import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


  @Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})

export class LoginPageComponent  implements OnInit {

  constructor(private http:HttpClient, private location: Location) {
  }

  link: string = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b9dd215152f19574ac1a74c43149c7fc21d4dfe75e2f8f30f41d8645c2466744&redirect_uri=http%3A%2F%2Flocalhost%3A8100&response_type=code";

  
  ngOnInit() {
    if (this.location.path() == "") {
      return;
    }

    let code = this.location.path().split("=")[1];
    //console.log(code);
    this.http.get(`http://localhost:3000/user/auth?code=${code}`).subscribe((data) => {
      console.log("ananı sikeyim",data);
    }
    );
  }
}
