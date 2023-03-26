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
      icon: "person-outline"
    },
    {
      name: "Social",
      icon: "chatbubbles-outline"
    },
    {
      name: "Play",
      icon: "game-controller-outline"
    },
    {
      name: "Settings",
      icon: "settings-outline"
    },
    {
      name: "Leaderboard",
      icon: "clipboard-outline"
    }
  ]

  constructor() { }

  ngOnInit() {}

}
