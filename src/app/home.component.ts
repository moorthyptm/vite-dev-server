import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home-qwerty-abc',
  standalone: true,
  imports: [AsyncPipe],
  template: ` <!-- Utilzing Async Pipe -->
    <p>
      {{ interval | async }}
    </p>`,
})
export class HomeComponent implements OnDestroy {
  interval = interval(1000);
  subscription: Subscription | undefined;
  private destroy$ = new Subject<void>();
  constructor() {
    // Example 1
    // Take the first 3 emitted values
    // this.interval.pipe(take(3)).subscribe(console.log);
    // Example 2
    // By utilizing a temporary property, we assign the subscription.
    // When the ngOnDestroy lifecycle hook is triggered,
    // we take the opportunity to unsubscribe from it
    // this.subscription = this.interval.subscribe(console.log);
    // Example 3
    // takeUntil operator
    // Which allows you to unsubscribe from a source Observable when another Observable emits a value
    // this.interval.pipe(takeUntil(this.destroy$)).subscribe(console.log);

    // Angular 16 takeUntilDestroyed Example -
    this.interval.pipe(takeUntilDestroyed()).subscribe(console.log);
  }
  ngOnDestroy(): void {
    // this.subscription?.unsubscribe();
    // this.destroy$.next();
    // this.destroy$.complete();
  }
}
