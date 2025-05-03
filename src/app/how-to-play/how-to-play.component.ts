import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

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

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  onAnimationClick(): void {
    if (this.animationItem) {
      this.animationItem.goToAndPlay(0, true);
    }
  }
}
