import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RefreshAppService {
  private refreshTrigger = signal(0);

  // 🔥 نطلق حدث refresh
  triggerRefresh() {
    this.refreshTrigger.update(v => v + 1);
  }

  // 👂 أي component يسمع منه
  onRefresh() {
    return this.refreshTrigger;
  }
}
