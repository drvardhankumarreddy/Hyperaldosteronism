import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12 font-sans">
      
      <header>
        <h2 class="text-2xl font-bold text-slate-900">Adrenal Venous Sampling (AVS)</h2>
        <p class="text-slate-500 mt-2 text-lg">Detailed reference for indications, protocol, and interpretation.</p>
      </header>

      <!-- Why Perform AVS? -->
      <div class="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 class="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Why is AVS Necessary?
        </h3>
        <p class="text-slate-700 mb-4 text-sm leading-relaxed">
          CT/MRI imaging alone is <strong>insufficient</strong> for subtyping PA. 
          Studies show discordant results between CT and AVS in <strong>~40%</strong> of patients.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <h4 class="font-bold text-slate-800 text-sm mb-1">Non-Functioning Nodules</h4>
            <p class="text-xs text-slate-600">
              Adrenal nodules are common in the general population. A visible nodule on CT may be non-functioning, while the PA is caused by a microadenoma on the contralateral side.
            </p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <h4 class="font-bold text-slate-800 text-sm mb-1">Microadenomas</h4>
            <p class="text-xs text-slate-600">
              Many aldosterone-producing adenomas (APA) are < 1cm and invisible on standard CT scans, leading to false "bilateral" diagnoses if relying on imaging alone.
            </p>
          </div>
        </div>
      </div>

      <!-- When to Bypass AVS? -->
      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-bold text-slate-900 mb-4">When can AVS be bypassed?</h3>
        <p class="text-slate-600 text-sm mb-4">
          In a small subset of patients with a <strong>Very High Probability</strong> of unilateral disease, AVS may be skipped, and the patient can proceed directly to surgery.
        </p>
        
        <div class="bg-slate-50 p-4 rounded-lg border-l-4 border-emerald-500">
           <h4 class="font-bold text-emerald-800 text-sm mb-2">Bypass Criteria (Must meet ALL):</h4>
           <ul class="space-y-2 text-sm text-slate-700">
             <li class="flex items-center gap-2">
               <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Age < 35 years
             </li>
             <li class="flex items-center gap-2">
               <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Spontaneous Hypokalemia
             </li>
             <li class="flex items-center gap-2">
               <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Marked Aldosterone Excess (>30 ng/dL)
             </li>
             <li class="flex items-center gap-2">
               <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> CT shows Unilateral Adenoma (>1cm) AND Normal Contralateral Gland
             </li>
           </ul>
        </div>
      </div>

      <!-- Interpretation Tables -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Selectivity Index -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
           <div class="mb-4">
             <h3 class="font-bold text-slate-900">1. Selectivity Index (SI)</h3>
             <p class="text-xs text-slate-500">Did the catheter successfully enter the adrenal vein?</p>
           </div>
           
           <div class="bg-slate-50 rounded p-3 mb-4 text-center font-mono text-sm border border-slate-200">
             SI = [Cortisol]<sub>Adrenal</sub> / [Cortisol]<sub>IVC</sub>
           </div>

           <div class="mt-auto space-y-3">
             <div class="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
               <span class="text-slate-600">Unstimulated (Basal)</span>
               <span class="font-bold text-blue-700">> 2:1</span>
             </div>
             <div class="flex justify-between items-center text-sm">
               <span class="text-slate-600">Cosyntropin Stimulated</span>
               <span class="font-bold text-blue-700">> 5:1</span>
             </div>
           </div>
        </div>

        <!-- Lateralization Index -->
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
           <div class="mb-4">
             <h3 class="font-bold text-slate-900">2. Lateralization Index (LI)</h3>
             <p class="text-xs text-slate-500">Is the disease unilateral or bilateral?</p>
           </div>
           
           <div class="bg-slate-50 rounded p-3 mb-4 text-center font-mono text-sm border border-slate-200">
             LI = (Aldo/Cort)<sub>Dom</sub> / (Aldo/Cort)<sub>Non-Dom</sub>
           </div>

           <div class="mt-auto space-y-3">
             <div class="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
               <span class="text-slate-600">Unilateral (Surgery)</span>
               <span class="font-bold text-emerald-700">> 4:1</span>
             </div>
             <div class="flex justify-between items-center text-sm">
               <span class="text-slate-600">Bilateral (Medical)</span>
               <span class="font-bold text-slate-700">< 3:1</span>
             </div>
             <div class="text-xs text-slate-400 mt-2 text-center">
               *Values between 3:1 and 4:1 are indeterminate (Grey Zone)
             </div>
           </div>
        </div>

      </div>

      <!-- Protocol Notes -->
      <div class="bg-slate-100 rounded-xl p-6 border border-slate-200">
        <h3 class="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Protocol Considerations</h3>
        <ul class="space-y-3 text-sm text-slate-700">
          <li class="flex gap-3">
            <span class="font-bold text-slate-900 shrink-0">Hypokalemia:</span>
            <span>Must be corrected before AVS. Hypokalemia suppresses aldosterone secretion, potentially leading to false-negative lateralization.</span>
          </li>
          <li class="flex gap-3">
            <span class="font-bold text-slate-900 shrink-0">ACTH Stimulation:</span>
            <span>Continuous Cosyntropin infusion (50mcg/h) is often used to minimize stress-induced fluctuations and confirm catheter selectivity, though some centers prefer unstimulated sampling.</span>
          </li>
          <li class="flex gap-3">
            <span class="font-bold text-slate-900 shrink-0">Concurrent Meds:</span>
            <span>Ideally performed after washout of interfering meds (MRAs, etc.), but can be done on non-interfering meds (Verapamil, Hydralazine, Doxazosin) to maintain safety.</span>
          </li>
        </ul>
      </div>

    </div>
  `
})
export class AvsComponent {}