import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
import { ScreeningComponent } from './components/screening.component';
import { MedicationsComponent } from './components/medications.component';
import { ManagementComponent } from './components/management.component';
import { RecommendationsComponent } from './components/recommendations.component';
import { AvsComponent } from './components/avs.component';

type View = 'dashboard' | 'screening' | 'medications' | 'management' | 'recommendations' | 'avs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    DashboardComponent, 
    ScreeningComponent, 
    MedicationsComponent, 
    ManagementComponent,
    RecommendationsComponent,
    AvsComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentView = signal<View>('dashboard');
  menuOpen = signal<boolean>(false);

  setView(view: View) {
    this.currentView.set(view);
    this.menuOpen.set(false); // Close mobile menu on navigate
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
}