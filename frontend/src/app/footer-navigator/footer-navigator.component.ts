import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-navigator',
  templateUrl: './footer-navigator.component.html',
  styleUrls: ['./footer-navigator.component.scss'],
})
export class FooterNavigatorComponent  implements OnInit {

  tabs = [
    {
      name: "Profile",
      icon: "person-outline",
      url: "profile"
    },
    {
      name: "Social",
      icon: "chatbubbles-outline",
      url: "social"
    },
    {
      name: "Play",
      icon: "game-controller-outline",
      url: "play"
    },
    {
      name: "Settings",
      icon: "settings-outline",
      url: "settings"
    },
    {
      name: "Leaderboard",
      icon: "clipboard-outline",
      url: "leaderboard"
    }
  ]

  constructor() { }

  ngOnInit() {}

}
