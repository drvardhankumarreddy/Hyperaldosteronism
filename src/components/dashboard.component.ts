import { Component, output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      <!-- Hero Card -->
      <div class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg shadow-blue-900/20">
        <h2 class="text-3xl font-bold mb-4">Primary Aldosteronism (PA)</h2>
        <p class="text-blue-100 text-lg leading-relaxed mb-6">
          Based on the 2025 Endocrine Society Clinical Practice Guideline. This tool assists clinicians in screening, diagnosing, and managing PA.
        </p>
        <div class="flex gap-4">
          <button (click)="navigate.emit('screening')" class="bg-white text-blue-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2">
            Start Screening
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
          <button (click)="navigate.emit('recommendations')" class="bg-blue-500/30 backdrop-blur-sm border border-blue-400/30 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-500/40 transition-colors">
            View Recommendations
          </button>
        </div>
      </div>

      <!-- Quick Access Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Screening Card -->
        <div (click)="navigate.emit('screening')" class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Screening Tool</h3>
          <p class="text-slate-500 text-sm">Calculate ARR (Aldosterone-Renin Ratio) and interpret results based on assay units.</p>
        </div>

        <!-- Management Card -->
        <div (click)="navigate.emit('management')" class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
          <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Management Algorithm</h3>
          <p class="text-slate-500 text-sm">Step-by-step guide for diagnosis confirmation, subtyping, and MRA titration.</p>
        </div>

        <!-- Interfering Meds -->
        <div (click)="navigate.emit('medications')" class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">Interfering Meds</h3>
          <p class="text-slate-500 text-sm">Check which antihypertensives affect screening results and find washout periods.</p>
        </div>

        <!-- AVS -->
        <div (click)="navigate.emit('avs')" class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-900 mb-2">AVS & Subtyping</h3>
          <p class="text-slate-500 text-sm">Interpretation of Adrenal Venous Sampling and indications for surgery.</p>
        </div>

      </div>
    </div>
  `
})
export class DashboardComponent {
  navigate = output<any>();
}