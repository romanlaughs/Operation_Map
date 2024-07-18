import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  phrases: string[] = [
    'Welcome to Operation Map',
    'All Your Project Information in One Convenient Place',
    'Please Sign Up/Log In to Continue'
  ];

  loadingPhrases: string[] = [
    'Loading your personalized user profile...',
    'Fetching the latest updates...',
    'Preparing your experience...'
  ];
  currentPhrase: string = this.phrases[0];
  loadingText: string = this.loadingPhrases[0];
  phraseIndex: number = 0;
  loadingPhraseIndex: number = 0;
  loading: boolean = false;

  private phraseSubscription: Subscription | null = null;
  private loadingSubscription: Subscription | null = null;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    console.log('HomeComponent initialized');

    this.phraseSubscription = interval(6000).subscribe(() => {
      if (!this.loading) {
        this.fadeOutAndChangePhrase();
      }
    });

    this.auth.isAuthenticated$.subscribe(isLoading => {
      this.loading = isLoading;
      if (this.loading) {
        if (this.loadingSubscription) {
          this.loadingSubscription.unsubscribe();
        }
        this.loadingSubscription = interval(6000).subscribe(() => {
          this.fadeOutAndChangeLoadingText();
        });
      } else if (this.loadingSubscription) {
        this.loadingSubscription.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    if (this.phraseSubscription) {
      this.phraseSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  fadeOutAndChangePhrase(): void {
    const changingTextElement = document.getElementById('changing-text');
    if (changingTextElement) {
      changingTextElement.classList.remove('fade-in');
      setTimeout(() => {
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        this.currentPhrase = this.phrases[this.phraseIndex];
        changingTextElement.classList.add('fade-in');
      }, 1000); // Matches the transition duration in CSS
    }
  }

  fadeOutAndChangeLoadingText(): void {
    const loadingTextElement = document.getElementById('loading-text');
    if (loadingTextElement) {
      loadingTextElement.classList.remove('fade-in');
      setTimeout(() => {
        this.loadingPhraseIndex = (this.loadingPhraseIndex + 1) % this.loadingPhrases.length;
        this.loadingText = this.loadingPhrases[this.loadingPhraseIndex];
        loadingTextElement.classList.add('fade-in');
      }, 1000); // Matches the transition duration in CSS
    }
  }
}
