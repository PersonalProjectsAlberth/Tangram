import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ThemeService } from '../services/theme.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-to-play',
  imports: [LottieComponent, TranslatePipe, CommonModule],
  templateUrl: './how-to-play.component.html',
  styleUrl: './how-to-play.component.css',
})
export class HowToPlayComponent {

  animationItem: AnimationItem | null = null;
  isVisible: boolean = false;
  isDarkMode: boolean = false;
  isTitleVisible: boolean = false;
  
  options: AnimationOptions = {
    path: '/lottie/howtoplay.json',
    loop: false,
    autoplay: true,
  };

  constructor(private themeService: ThemeService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.updateAnimation();
    });
    setTimeout(() => {
      this.isVisible = true;
    }, 0);
    setTimeout(() => {
      this.isTitleVisible = true;
    }, 500);
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
