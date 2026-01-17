import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-6xl mx-auto animate-in fade-in duration-500 font-sans pb-20">
      
      <header class="mb-8">
         <h2 class="text-3xl font-bold text-slate-900">Clinical Management Algorithm</h2>
         <p class="text-slate-500 mt-2 text-lg">Diagnosis Confirmation, Subtyping (AVS Decision), and Treatment</p>
      </header>

      <!-- Navigation Tabs -->
      <div class="flex flex-col sm:flex-row bg-slate-100 p-1.5 rounded-xl mb-8 gap-1">
        <button (click)="setStep(1)" 
          class="flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
          [class]="currentStep() === 1 ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'">
          1. Confirmation
        </button>
        <button (click)="setStep(2)" 
          class="flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
          [class]="currentStep() === 2 ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'">
          2. Subtyping & AVS
        </button>
        <button (click)="setStep(3)" 
          class="flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
          [class]="currentStep() === 3 ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'">
          3. Treatment
        </button>
      </div>

      <!-- STEP 1: CONFIRMATION -->
      @if (currentStep() === 1) {
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-in slide-in-from-right-4 duration-300">
          
          <div class="flex flex-col md:flex-row items-start gap-6 mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Understanding Probability
              </h3>
              <p class="text-slate-600 mt-2 text-sm leading-relaxed">
                After a positive screen (Elevated ARR), the probability of PA depends on the biochemical phenotype. 
                <span class="font-bold text-slate-900">High Probability</span> phenotypes allow skipping confirmatory tests. 
                <span class="font-bold text-slate-900">Intermediate</span> phenotypes require suppression testing.
              </p>
            </div>
            
            <!-- Probability Key -->
            <div class="flex flex-col gap-2 w-full md:w-auto text-xs font-medium">
               <div class="flex items-center gap-2 bg-white px-3 py-2 rounded border border-emerald-200 shadow-sm">
                 <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                 <span class="text-emerald-900">High Probability (Confirmed PA)</span>
               </div>
               <div class="flex items-center gap-2 bg-white px-3 py-2 rounded border border-blue-200 shadow-sm">
                 <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                 <span class="text-blue-900">Intermediate (Needs Test)</span>
               </div>
               <div class="flex items-center gap-2 bg-white px-3 py-2 rounded border border-slate-200 shadow-sm">
                 <div class="w-3 h-3 rounded-full bg-slate-400"></div>
                 <span class="text-slate-600">Low Probability (Unlikely)</span>
               </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- High Probability / Bypass -->
            <div class="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100 flex flex-col h-full relative overflow-hidden">
               <div class="absolute top-0 right-0 p-4 opacity-10">
                 <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-900"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
               </div>
               
               <div class="flex items-center gap-3 mb-4 relative z-10">
                 <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">A</div>
                 <h4 class="font-bold text-emerald-900">High Probability Criteria</h4>
               </div>
               
               <p class="text-sm text-slate-600 mb-4 relative z-10">
                 If the patient meets <span class="font-bold">ALL</span> criteria below, PA is confirmed. No further testing needed.
               </p>
               
               <div class="space-y-3 flex-1 relative z-10">
                 <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100 cursor-pointer hover:border-emerald-400 transition-colors shadow-sm">
                   <input type="checkbox" [(ngModel)]="step1_hypo" class="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300">
                   <span class="text-slate-800 font-medium text-sm">Spontaneous Hypokalemia</span>
                 </label>
                 <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100 cursor-pointer hover:border-emerald-400 transition-colors shadow-sm">
                   <input type="checkbox" [(ngModel)]="step1_renin" class="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300">
                   <span class="text-slate-800 font-medium text-sm">Undetectable / Suppressed Renin</span>
                 </label>
                 <label class="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-100 cursor-pointer hover:border-emerald-400 transition-colors shadow-sm">
                   <input type="checkbox" [(ngModel)]="step1_aldo" class="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300">
                   <span class="text-slate-800 font-medium text-sm">Aldosterone > 20 ng/dL (550 pmol/L)</span>
                 </label>
               </div>

               @if (step1_isConfirmed()) {
                 <div class="mt-6 bg-emerald-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 animate-in zoom-in-95 relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <div>
                      <div class="font-bold">PA Diagnosis Confirmed</div>
                      <div class="text-xs opacity-90">Criteria Met. Proceed to Step 2.</div>
                    </div>
                 </div>
               }
            </div>

            <!-- Intermediate / Low Probability -->
            <div class="bg-blue-50/50 rounded-xl p-6 border border-blue-100 flex flex-col h-full">
               <div class="flex items-center gap-3 mb-4">
                 <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">B</div>
                 <h4 class="font-bold text-blue-900">Intermediate Probability</h4>
               </div>

               <p class="text-sm text-slate-600 mb-6">
                 If criteria on left are <span class="font-bold">NOT</span> met (e.g. Normokalemia, or Aldo < 20), the probability is Intermediate.
               </p>

               <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
                 <h5 class="font-bold text-slate-900 mb-3 text-sm">Does the patient desire surgery?</h5>
                 <div class="flex gap-3">
                   <button (click)="step1_surgeryDesire.set('yes')" 
                     class="flex-1 py-2 rounded-md font-semibold text-sm border transition-colors"
                     [class]="step1_surgeryDesire() === 'yes' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'">
                     Yes
                   </button>
                   <button (click)="step1_surgeryDesire.set('no')" 
                     class="flex-1 py-2 rounded-md font-semibold text-sm border transition-colors"
                     [class]="step1_surgeryDesire() === 'no' ? 'bg-slate-700 text-white border-slate-700' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'">
                     No
                   </button>
                 </div>
                 
                 @if (step1_surgeryDesire() === 'yes') {
                   <div class="mt-4 bg-blue-50 p-3 rounded text-sm text-blue-800 border border-blue-100 animate-in fade-in">
                     <p class="font-bold mb-1">Recommendation:</p>
                     Perform Suppression Test (Oral Sodium Loading or Saline Infusion).
                     <div class="mt-2 text-xs text-blue-600">
                       <span class="font-semibold">Negative Test?</span> → Low Probability (PA Unlikely).<br>
                       <span class="font-semibold">Positive Test?</span> → PA Confirmed. Proceed to Step 2.
                     </div>
                   </div>
                 }
                 @if (step1_surgeryDesire() === 'no') {
                   <div class="mt-4 bg-slate-50 p-3 rounded text-sm text-slate-700 border border-slate-200 animate-in fade-in">
                     <p class="font-bold mb-1">Recommendation:</p>
                     Medical Management (MRA). Skip suppression testing.
                   </div>
                 }
               </div>
               
               <!-- Low Probability Note -->
               <div class="mt-auto border-t border-slate-200 pt-4">
                  <div class="flex items-start gap-2">
                    <div class="w-2 h-2 rounded-full bg-slate-400 mt-1.5 shrink-0"></div>
                    <div>
                      <h5 class="text-xs font-bold text-slate-700">What about Low Probability?</h5>
                      <p class="text-xs text-slate-500 leading-relaxed">
                        If the initial Screening ARR was normal/negative, the probability of PA is Low. 
                        Testing is generally stopped unless clinical suspicion remains high (e.g. interfering meds caused false negative). 
                        Treat as Essential Hypertension.
                      </p>
                    </div>
                  </div>
               </div>

            </div>

          </div>
        </div>
      }

      <!-- STEP 2: SUBTYPING & AVS -->
      @if (currentStep() === 2) {
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-in slide-in-from-right-4 duration-300">
          
          <div class="flex items-start gap-4 mb-8">
            <div class="bg-purple-100 p-3 rounded-xl text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-slate-900">Adrenal Venous Sampling (AVS) Decision Guide</h3>
              <p class="text-slate-600 max-w-2xl mt-1">
                AVS is the gold standard for distinguishing unilateral (surgically curable) from bilateral disease. 
                Imaging alone is insufficient. However, select patients with a <span class="font-bold text-slate-900">very high probability of unilateral disease</span> may bypass AVS.
              </p>
            </div>
          </div>

          <div class="bg-slate-900 rounded-2xl p-8 text-white grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <!-- Assessment Form -->
            <div>
               <h4 class="text-purple-300 font-bold uppercase tracking-wider text-sm mb-6 pb-2 border-b border-slate-700">
                 AVS Bypass Probability Assessment
               </h4>
               
               <div class="space-y-4">
                 
                 <div class="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
                   <span class="font-medium text-slate-200">Age < 35 years</span>
                   <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" [(ngModel)]="step2_age" class="sr-only peer">
                      <div class="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                   </label>
                 </div>

                 <div class="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
                   <span class="font-medium text-slate-200">Spontaneous Hypokalemia</span>
                   <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" [(ngModel)]="step2_hypo" class="sr-only peer">
                      <div class="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                   </label>
                 </div>

                 <div class="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
                   <span class="font-medium text-slate-200">Aldosterone > 30 ng/dL (830 pmol/L)</span>
                   <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" [(ngModel)]="step2_aldo" class="sr-only peer">
                      <div class="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                   </label>
                 </div>

                 <div class="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
                   <span class="font-medium text-slate-200">CT: Unilateral adenoma (>1cm)</span>
                   <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" [(ngModel)]="step2_ct_uni" class="sr-only peer">
                      <div class="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                   </label>
                 </div>

                 <div class="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
                   <span class="font-medium text-slate-200">CT: Contralateral gland is normal</span>
                   <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" [(ngModel)]="step2_ct_contra" class="sr-only peer">
                      <div class="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                   </label>
                 </div>

               </div>
            </div>

            <!-- Recommendation Output -->
            <div class="flex flex-col items-center justify-center bg-slate-800 rounded-xl border border-slate-700 p-8 text-center h-full">
               
               @if (step2_canBypass()) {
                 <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 animate-in zoom-in">
                   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="20 6 9 17 4 12"/></svg>
                 </div>
                 <h3 class="text-2xl font-bold text-white mb-2">Consider Bypassing AVS</h3>
                 <p class="text-green-300 font-medium">High Probability of Unilateral Disease</p>
                 <p class="text-slate-400 text-sm mt-4 leading-relaxed">
                   The patient meets all criteria for high probability of unilateral adenoma. 
                   Guidelines suggest proceeding directly to surgery may be appropriate.
                 </p>
               } @else {
                 <div class="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-600/20 animate-in zoom-in">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                 </div>
                 <h3 class="text-2xl font-bold text-white mb-2">Perform AVS</h3>
                 <p class="text-purple-300 font-medium">Standard of Care</p>
                 <p class="text-slate-400 text-sm mt-4 leading-relaxed">
                   Imaging alone is insufficient (discordance rate ~40%). If patient is a surgical candidate, AVS is required to confirm lateralization.
                 </p>
               }
            </div>

          </div>

          <div class="mt-6 bg-slate-50 border border-slate-200 p-4 rounded-lg text-xs text-slate-600">
            <span class="font-bold">Note:</span> AVS should be performed by an experienced interventional radiologist. Success is defined by the Selectivity Index (Cortisol gradient between Adrenal Vein and IVC). Lateralization is defined by the Lateralization Index (Aldo/Cortisol ratio dominant vs non-dominant).
          </div>
        </div>
      }

      <!-- STEP 3: TREATMENT -->
      @if (currentStep() === 3) {
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-300">
          
          <!-- Surgical Management -->
          <div class="bg-emerald-50 rounded-2xl border border-emerald-100 overflow-hidden flex flex-col">
            <div class="bg-emerald-100/80 p-6 border-b border-emerald-200 flex items-center gap-3">
               <div class="w-10 h-10 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">S</div>
               <h3 class="font-bold text-emerald-900 text-lg">Surgical Management</h3>
            </div>
            
            <div class="p-6 md:p-8 space-y-6 flex-1">
               <div class="bg-white rounded-xl p-5 border border-emerald-100 shadow-sm">
                 <h4 class="font-bold text-emerald-800 text-sm uppercase tracking-wide mb-3">Laparoscopic Adrenalectomy</h4>
                 
                 <ul class="space-y-4 text-sm">
                   <li class="flex gap-3">
                     <span class="font-bold text-emerald-600 shrink-0">• Indication:</span>
                     <span class="text-slate-700">Proven unilateral disease (via AVS or high-prob bypass criteria).</span>
                   </li>
                   <li class="flex gap-3">
                     <span class="font-bold text-emerald-600 shrink-0">• Outcome:</span>
                     <span class="text-slate-700">Cures hypokalemia in >98%. Cures hypertension in ~40-60% (significantly improves control in remainder).</span>
                   </li>
                   <li class="flex gap-3">
                     <span class="font-bold text-emerald-600 shrink-0">• Pre-op:</span>
                     <span class="text-slate-700">Correct hypokalemia. Treat with MRA for 3-4 weeks pre-op to control BP and reverse metabolic effects.</span>
                   </li>
                   <li class="flex gap-3">
                     <span class="font-bold text-emerald-600 shrink-0">• Post-op:</span>
                     <span class="text-slate-700">Stop MRA/K+ supplements day 1. Monitor BP/K+. Evaluate biochem cure (Aldo/Renin) at 3 months.</span>
                   </li>
                 </ul>
               </div>
            </div>
          </div>

          <!-- Medical Management -->
          <div class="bg-blue-50 rounded-2xl border border-blue-100 overflow-hidden flex flex-col">
             <div class="bg-blue-100/80 p-6 border-b border-blue-200 flex items-center gap-3">
               <div class="w-10 h-10 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold">M</div>
               <h3 class="font-bold text-blue-900 text-lg">Medical Management</h3>
            </div>
            
            <div class="p-6 md:p-8 flex-1">
               <div class="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
                 <div class="bg-blue-50 px-5 py-3 border-b border-blue-200">
                   <h4 class="font-bold text-blue-800 text-xs uppercase tracking-wide">MRA Titration Protocol</h4>
                 </div>
                 
                 <div class="p-5 space-y-6">
                   
                   <!-- Step 1 -->
                   <div>
                     <h5 class="font-bold text-slate-900 text-sm mb-1">1. Initiation</h5>
                     <p class="text-sm text-slate-600">Start Spironolactone 12.5–25 mg OD (or Eplerenone 25 mg BID).</p>
                   </div>

                   <!-- Step 2 -->
                   <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
                     <h5 class="font-bold text-slate-900 text-sm mb-2">2. Target Goals</h5>
                     <ul class="text-sm text-slate-700 list-disc pl-4 space-y-1">
                       <li>Normal BP</li>
                       <li>Normal Potassium</li>
                       <li class="font-semibold text-blue-700">Un-suppressed Renin <span class="font-normal text-slate-500">(Crucial Biomarker)</span></li>
                     </ul>
                   </div>

                   <!-- Step 3 -->
                   <div>
                     <h5 class="font-bold text-slate-900 text-sm mb-2">3. Titration Logic</h5>
                     <p class="text-xs text-slate-500 mb-3">Check Renin/BP/K+ every 3 months.</p>
                     
                     <div class="grid grid-cols-2 gap-3 text-xs">
                       <div class="bg-slate-50 p-3 rounded border border-slate-200">
                         <span class="font-bold text-slate-800 block mb-1">Renin Low?</span>
                         Increase MRA dose.
                       </div>
                       <div class="bg-slate-50 p-3 rounded border border-slate-200">
                         <span class="font-bold text-slate-800 block mb-1">Renin Normal?</span>
                         Add CCB/Thiazide if BP still high.
                       </div>
                     </div>
                   </div>

                 </div>
               </div>
            </div>
          </div>

        </div>
      }

    </div>
  `
})
export class ManagementComponent {
  currentStep = signal<1 | 2 | 3>(1);

  // Step 1 State
  step1_hypo = signal(false);
  step1_renin = signal(false);
  step1_aldo = signal(false);
  step1_surgeryDesire = signal<'yes' | 'no' | null>(null);

  step1_isConfirmed = computed(() => 
    this.step1_hypo() && this.step1_renin() && this.step1_aldo()
  );

  // Step 2 State
  step2_age = signal(false);
  step2_hypo = signal(false);
  step2_aldo = signal(false);
  step2_ct_uni = signal(false);
  step2_ct_contra = signal(false);

  step2_canBypass = computed(() => 
    this.step2_age() && this.step2_hypo() && this.step2_aldo() && 
    this.step2_ct_uni() && this.step2_ct_contra()
  );

  setStep(step: 1 | 2 | 3) {
    this.currentStep.set(step);
  }
}