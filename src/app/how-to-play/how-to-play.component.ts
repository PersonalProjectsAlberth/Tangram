import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-how-to-play',
  imports: [LottieComponent],
  templateUrl: './how-to-play.component.html',
  styleUrl: './how-to-play.component.css',
})
export class HowToPlayComponent {

  animationItem: AnimationItem | null = null;
  
  options: AnimationOptions = {
    path: '/lottie/howtoplay.json',
    loop: false,
    autoplay: true,
  };

  isDarkMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.updateAnimation();
    });
  }

  updateAnimation(): void {
    this.options = {
      ...this.options,
      path: this.isDarkMode ? '/lottie/htpLight.json' : '/lottie/htpDark.json',
    };
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  onAnimationClick(): void {
    if (this.animationItem) {
      this.animationItem.goToAndPlay(0, true);
    }
  }
}
