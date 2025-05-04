import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ThemeService } from '../services/theme.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-how-to-play',
  imports: [LottieComponent, TranslatePipe],
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

  constructor(private themeService: ThemeService, private translate: TranslateService) {}

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
    this.animationItem.setSpeed(0.5); 
  }

  onAnimationClick(): void {
    if (this.animationItem) {
      if (this.animationItem.currentFrame >= this.animationItem.totalFrames - 1) {
        this.animationItem.goToAndPlay(0, true);
      } else if (this.animationItem.isPaused) {
        this.animationItem.play();
      } else {
        this.animationItem.pause();
      }
    }
  }
}
