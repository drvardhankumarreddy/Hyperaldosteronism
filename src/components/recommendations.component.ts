import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Recommendation {
  id: number;
  title: string;
  statement: string;
  rationale: string;
  grade: 'Strong' | 'Conditional';
  certainty: 'High' | 'Moderate' | 'Low';
  isOpen: boolean;
}

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500 pb-12 font-sans">
      
      <header class="mb-8">
        <h2 class="text-3xl font-bold text-slate-900">Summary of Recommendations</h2>
        <p class="text-slate-500 mt-2 text-lg">Key takeaways with detailed clinical rationale from the 2025 Guideline.</p>
      </header>

      <div class="space-y-4">
        
        @for (rec of recommendations(); track rec.id) {
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300"
               [class.ring-2]="rec.isOpen" [class.ring-blue-100]="rec.isOpen" [class.border-blue-200]="rec.isOpen">
            
            <!-- Header (Clickable) -->
            <button (click)="toggle(rec.id)" class="w-full text-left p-5 flex gap-4 items-start hover:bg-slate-50 transition-colors">
               <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
                    [class]="rec.isOpen ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'">
                 {{ rec.id }}
               </div>
               
               <div class="flex-1">
                 <div class="flex justify-between items-start gap-4">
                   <h3 class="font-bold text-slate-900 text-lg leading-tight">{{ rec.title }}</h3>
                   <span class="flex-shrink-0 text-slate-400 transition-transform duration-300" [class.rotate-180]="rec.isOpen">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                   </span>
                 </div>
                 
                 <p class="text-slate-700 mt-2 font-medium leading-relaxed">
                   {{ rec.statement }}
                 </p>
                 
                 <div class="mt-3 flex gap-2">
                   <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wide border"
                         [class]="rec.grade === 'Strong' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'">
                     {{ rec.grade }} Recommendation
                   </span>
                   <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wide border bg-slate-50 text-slate-600 border-slate-200">
                     {{ rec.certainty }} Certainty
                   </span>
                 </div>
               </div>
            </button>

            <!-- Expanded Rationale -->
            @if (rec.isOpen) {
              <div class="bg-blue-50/50 p-6 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                <div class="flex gap-3">
                  <div class="mt-1 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-blue-900 text-sm uppercase tracking-wide mb-2">Rationale & Evidence</h4>
                    <p class="text-slate-700 text-sm leading-7 whitespace-pre-line">
                      {{ rec.rationale }}
                    </p>
                  </div>
                </div>
              </div>
            }

          </div>
        }

      </div>
    </div>
  `
})
export class RecommendationsComponent {
  
  recommendations = signal<Recommendation[]>([
    {
      id: 1,
      title: 'Universal Screening',
      statement: 'We suggest screening for Primary Aldosteronism in all patients with hypertension.',
      rationale: 'Current evidence suggests PA prevalence is much higher than historically taught (5–10% of general hypertension, and up to 20% of resistant hypertension). Detecting PA allows for specific treatment that mitigates cardiovascular risk beyond blood pressure control alone. The cost-effectiveness of screening all hypertensives is supported by the prevention of long-term renal and cardiac sequelae.',
      grade: 'Conditional',
      certainty: 'Low',
      isOpen: true
    },
    {
      id: 2,
      title: 'Targeted Therapy Benefits',
      statement: 'We recommend PA-specific treatment (Adrenalectomy or MRA) over generic antihypertensive therapy.',
      rationale: 'Aldosterone excess causes target organ damage (fibrosis, inflammation, remodeling) independent of blood pressure. Studies consistently show that patients treated with specific therapy (surgical cure or adequate MRA blockade) have better cardiovascular outcomes and quality of life compared to those with similar BP control achieved via other agents (e.g., CCBs, Beta-blockers).',
      grade: 'Strong',
      certainty: 'Moderate',
      isOpen: false
    },
    {
      id: 3,
      title: 'Diagnostic Biomarkers',
      statement: 'Screen using ARR (Aldosterone-Renin Ratio) rather than Potassium or Aldosterone alone.',
      rationale: 'Hypokalemia is present in only a minority (~30%) of PA patients, mostly those with severe disease. Relying on hypokalemia leads to missed diagnoses in the majority of patients ("Normokalemic PA"). The ARR remains the most robust case-finding tool, provided testing conditions (medication washout, potassium correction) are optimized.',
      grade: 'Strong',
      certainty: 'Moderate',
      isOpen: false
    },
    {
      id: 4,
      title: 'Suppression Testing Strategy',
      statement: 'Perform confirmatory suppression testing in intermediate phenotypes; bypass in high-probability phenotypes.',
      rationale: 'Screening can yield false positives. Confirmation (e.g., Saline Infusion, Oral Sodium Loading) proves autonomous aldosterone secretion. However, in patients with spontaneous hypokalemia, suppressed renin, and markedly elevated aldosterone (>20 ng/dL), the probability of PA is effectively 100%, rendering confirmatory testing redundant, costly, and burdensome.',
      grade: 'Conditional',
      certainty: 'Moderate',
      isOpen: false
    },
    {
      id: 5,
      title: 'Adrenal Venous Sampling (AVS)',
      statement: 'Perform AVS with CT in surgical candidates to distinguish unilateral vs. bilateral disease.',
      rationale: 'Cross-sectional imaging (CT/MRI) is notoriously inaccurate for subtyping. It misses microadenomas (<1cm) and identifies non-functioning incidentalomas, leading to incorrect treatment in ~40% of cases if used alone. AVS is the only reliable functional test to lateralize secretion. It may be bypassed only in young patients (<35y) with florid features and clear unilateral macroadenoma.',
      grade: 'Strong',
      certainty: 'Moderate',
      isOpen: false
    },
    {
      id: 6,
      title: 'Monitoring Renin on MRA',
      statement: 'Titrate Mineralocorticoid Receptor Antagonists (MRA) to normalize blood pressure AND un-suppress Renin.',
      rationale: 'A suppressed renin indicates that the mineralocorticoid receptor is still being activated by excess aldosterone. To fully block the deleterious effects of aldosterone, the dose of Spironolactone/Eplerenone must be increased until Renin rises (no longer suppressed). This "biochemical cure" is associated with significantly better cardiac outcomes than BP control with suppressed renin.',
      grade: 'Conditional',
      certainty: 'Low',
      isOpen: false
    },
    {
      id: 7,
      title: 'Co-Secretion (Cushing\'s)',
      statement: 'Perform a 1-mg Overnight Dexamethasone Suppression Test in all PA patients with an adrenal mass.',
      rationale: 'Aldosterone-producing adenomas frequently co-secrete cortisol (Mild Autonomous Cortisol Secretion - MACS). Unrecognized cortisol co-secretion increases metabolic risk and can lead to life-threatening adrenal insufficiency post-adrenalectomy if not anticipated. A post-dexamethasone cortisol >1.8 µg/dL warrants further evaluation.',
      grade: 'Strong',
      certainty: 'Moderate',
      isOpen: false
    }
  ]);

  toggle(id: number) {
    this.recommendations.update(recs => 
      recs.map(r => r.id === id ? { ...r, isOpen: !r.isOpen } : { ...r, isOpen: false })
    );
  }
}