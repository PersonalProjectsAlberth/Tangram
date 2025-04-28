import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tangram-App';

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService)
    {
    const savedLanguage = this.languageService.getLanguage();
    this.translate.use(savedLanguage);
  }

}
