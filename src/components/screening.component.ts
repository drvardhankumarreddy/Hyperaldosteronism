import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-screening',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-12 font-sans">
      
      <div class="flex justify-between items-end mb-2">
        <div>
          <h2 class="text-2xl font-bold text-slate-900">PA Screening Calculator</h2>
          <p class="text-slate-500 text-sm">Aldosterone-Renin Ratio (ARR) • 2025 Guideline Logic</p>
        </div>
        <div class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">Guidelines 2025</div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        <!-- Measurement Method -->
        <div class="bg-slate-50 p-6 border-b border-slate-200">
          <label class="block text-sm font-bold text-slate-900 mb-3">Measurement Method</label>
          <div class="flex gap-6 mb-3">
             <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="method" [checked]="aldoMethod() === 'Immunoassay'" (change)="aldoMethod.set('Immunoassay')" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                <span class="text-slate-800 text-sm font-medium">Immunoassay (RIA/CLIA)</span>
             </label>
             <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="method" [checked]="aldoMethod() === 'LCMS'" (change)="aldoMethod.set('LCMS')" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                <span class="text-slate-800 text-sm font-medium">LC-MS/MS</span>
             </label>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">
            Note: Immunoassay is the traditional standard. LC-MS/MS is more specific but yields lower values (~25% lower), requiring lower cutoffs.
          </p>
        </div>

        <div class="p-6 space-y-8">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Aldosterone Input -->
            <div>
              <label class="block text-sm font-bold text-slate-900 mb-2">Aldosterone (PAC)</label>
              <div class="flex rounded-md shadow-sm">
                <input type="number" [(ngModel)]="aldoValue" class="flex-1 min-w-0 block w-full rounded-l-md border-slate-300 border py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter value">
                <select [(ngModel)]="aldoUnit" class="inline-flex items-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500 hover:bg-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="ng/dL">ng/dL</option>
                  <option value="pmol/L">pmol/L</option>
                </select>
              </div>
              
              <!-- Aldo Conversion Helpers -->
              @if (aldoValue() !== null) {
                <div class="mt-2 flex flex-wrap gap-2">
                  @if (aldoUnit() !== 'ng/dL') {
                    <button (click)="convertAldoTo('ng/dL')" class="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded hover:bg-blue-100 transition-colors">
                      Convert to ng/dL
                    </button>
                  }
                  @if (aldoUnit() !== 'pmol/L') {
                    <button (click)="convertAldoTo('pmol/L')" class="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded hover:bg-blue-100 transition-colors">
                      Convert to pmol/L
                    </button>
                  }
                </div>
              }
              <p class="text-xs text-slate-400 mt-2">
                Min. suspicious level: ≥ {{ aldoMethod() === 'Immunoassay' ? '10' : '7.5' }} ng/dL
              </p>
            </div>

            <!-- Renin Input -->
            <div>
              <label class="block text-sm font-bold text-slate-900 mb-2">Renin</label>
              
              <!-- Renin Type Selector -->
              <select [ngModel]="reninType()" (ngModelChange)="setReninType($event)" class="block w-full rounded-md border-slate-300 border py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500 mb-2 bg-white">
                <option value="PRA">Plasma Renin Activity (PRA)</option>
                <option value="DRC">Direct Renin Concentration (DRC)</option>
              </select>

              <div class="flex rounded-md shadow-sm">
                <input type="number" [(ngModel)]="reninValue" class="flex-1 min-w-0 block w-full rounded-l-md border-slate-300 border py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter value">
                <select [(ngModel)]="reninUnit" class="inline-flex items-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500 hover:bg-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-28">
                  @if (reninType() === 'PRA') {
                    <option value="ng/mL/h">ng/mL/h</option>
                    <option value="pmol/L/min">pmol/L/min</option>
                  } @else {
                    <option value="mU/L">mU/L</option>
                    <option value="ng/L">ng/L</option>
                  }
                </select>
              </div>

               <!-- Renin Conversion Helpers -->
              @if (reninValue() !== null) {
                <div class="mt-2 flex flex-wrap gap-2">
                  @if (reninType() === 'PRA') {
                    @if (reninUnit() !== 'ng/mL/h') {
                      <button (click)="convertReninTo('ng/mL/h')" class="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded hover:bg-blue-100 transition-colors">
                        Convert to ng/mL/h
                      </button>
                    }
                  } @else {
                    @if (reninUnit() !== 'mU/L') {
                      <button (click)="convertReninTo('mU/L')" class="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded hover:bg-blue-100 transition-colors">
                        Convert to mU/L
                      </button>
                    }
                  }
                </div>
              }
              <p class="text-xs text-slate-400 mt-2">
                Suppressed if ≤ {{ reninSuppressionCutoffDisplay() }}
              </p>
            </div>

          </div>

          <!-- Potassium Input -->
          <div>
            <label class="block text-sm font-bold text-slate-900 mb-2">Serum Potassium (Optional)</label>
            <div class="flex rounded-md shadow-sm w-full md:w-1/2">
              <input type="number" [(ngModel)]="potassiumValue" class="flex-1 min-w-0 block w-full rounded-l-md border-slate-300 border py-2 px-3 text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g. 3.5">
              <span class="inline-flex items-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500">
                mmol/L
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-2">Hypokalemia should be corrected before screening if possible.</p>
          </div>

        </div>
        
        <!-- Results Footer -->
        @if (interpretation().status !== 'unknown') {
          <div class="bg-slate-50 p-6 border-t border-slate-200 animate-in slide-in-from-bottom-2">
            
            <div class="flex flex-col md:flex-row gap-6 items-start">
               <!-- ARR Result Badge -->
               <div class="bg-white p-4 rounded-lg shadow-sm border border-slate-200 min-w-[180px]">
                 <div class="text-xs text-slate-500 uppercase tracking-wide font-bold">Calculated ARR</div>
                 <div class="text-3xl font-bold text-slate-900 my-1">{{ arrResultDisplay() }}</div>
                 <div class="text-[10px] text-slate-400">
                   Unit: {{ aldoUnit() }} / {{ reninUnit() }}
                 </div>
               </div>

               <!-- Interpretation Text -->
               <div class="flex-1">
                 @if (interpretation().status === 'positive') {
                   <div class="flex items-start gap-3">
                      <div class="bg-red-100 text-red-600 p-2 rounded-full mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      </div>
                      <div>
                        <h4 class="text-lg font-bold text-red-700">Positive Screen for PA</h4>
                        <p class="text-sm text-red-600 mt-1">
                          The ARR is elevated (>{{ arrCutoffDisplay() }}) with non-suppressed aldosterone.
                          @if (isHighProbability()) {
                             <br><span class="font-bold">High Probability Phenotype:</span> Consider bypassing confirmatory testing.
                          }
                        </p>
                      </div>
                   </div>
                 } @else {
                   <div class="flex items-start gap-3">
                      <div class="bg-green-100 text-green-600 p-2 rounded-full mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div>
                        <h4 class="text-lg font-bold text-green-700">Negative Screen</h4>
                        <p class="text-sm text-green-600 mt-1">
                          Values are not currently suggestive of Primary Aldosteronism.
                        </p>
                         <p class="text-xs text-green-600 mt-1">
                           Cutoff used: >{{ arrCutoffDisplay() }} ({{ aldoUnit() }}/{{ reninUnit() }})
                         </p>
                      </div>
                   </div>
                 }
               </div>
            </div>

          </div>
        }

      </div>

      <!-- Technical Note Box -->
      <div class="bg-blue-50 rounded-xl p-6 border border-blue-100 text-sm text-slate-700">
        <h3 class="font-bold text-blue-900 mb-3">2025 Guideline Reference Values</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-bold text-blue-800 mb-2 text-xs uppercase">Aldosterone Cutoffs</h4>
            <ul class="space-y-1 list-disc pl-4 text-xs marker:text-blue-400">
              <li><span class="font-semibold">Immunoassay:</span> ≥10 ng/dL</li>
              <li><span class="font-semibold">LC-MS/MS:</span> ≥7.5 ng/dL</li>
            </ul>
          </div>
          <div>
             <h4 class="font-bold text-blue-800 mb-2 text-xs uppercase">Renin Suppression</h4>
             <ul class="space-y-1 list-disc pl-4 text-xs marker:text-blue-400">
              <li><span class="font-semibold">PRA:</span> ≤1.0 ng/mL/h</li>
              <li><span class="font-semibold">DRC:</span> ≤8.2 mU/L</li>
            </ul>
          </div>
        </div>

        <h4 class="font-bold text-blue-800 mt-4 mb-2 text-xs uppercase">ARR Positive Screen Cutoffs</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left">
            <thead>
              <tr class="border-b border-blue-200">
                <th class="py-1 pr-2">Assay Method</th>
                <th class="py-1 px-2">PRA (ng/dL / ng/mL/h)</th>
                <th class="py-1 px-2">DRC (pmol/L / mU/L)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-blue-100">
              <tr>
                <td class="py-1 pr-2 font-semibold">Immunoassay</td>
                <td class="py-1 px-2">> 20</td>
                <td class="py-1 px-2">> 70</td>
              </tr>
              <tr>
                <td class="py-1 pr-2 font-semibold">LC-MS/MS</td>
                <td class="py-1 px-2">> 15</td>
                <td class="py-1 px-2">> 52</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h4 class="font-bold text-blue-800 mt-4 mb-2 text-xs uppercase">Standard Conversions</h4>
        <ul class="space-y-1 list-disc pl-5 marker:text-blue-400 text-xs">
          <li><span class="font-semibold">Aldo:</span> 1 ng/dL = 27.7 pmol/L</li>
          <li><span class="font-semibold">PRA:</span> 1 ng/mL/h = 12.9 pmol/L/min</li>
          <li><span class="font-semibold">DRC:</span> 1 mU/L ≈ 0.333 ng/L (Mass)</li>
        </ul>
      </div>

    </div>
  `
})
export class ScreeningComponent {
  reninType = signal<'PRA' | 'DRC'>('PRA');
  reninValue = signal<number | null>(null);
  reninUnit = signal<string>('ng/mL/h');

  aldoMethod = signal<'Immunoassay' | 'LCMS'>('Immunoassay');
  aldoValue = signal<number | null>(null);
  aldoUnit = signal<string>('ng/dL');
  
  potassiumValue = signal<number | null>(null);

  // --- Constants (2025 Guideline Image 1) ---
  
  // Cutoffs are defined in specific units:
  // PRA base ratio unit: (ng/dL) / (ng/mL/h)
  readonly CUTOFF_PRA_IMMUNO = 20; 
  readonly CUTOFF_PRA_LCMS = 15;

  // DRC base ratio unit: (pmol/L) / (mU/L)
  readonly CUTOFF_DRC_IMMUNO = 70;
  readonly CUTOFF_DRC_LCMS = 52;

  // Suppression
  readonly SUPPRESSION_PRA = 1.0; // ng/mL/h
  readonly SUPPRESSION_DRC = 8.2; // mU/L

  // Aldo Suspicion
  readonly MIN_ALDO_IMMUNO = 10; // ng/dL
  readonly MIN_ALDO_LCMS = 7.5; // ng/dL

  // --- Conversion Factors (Image 2) ---
  readonly FACTOR_ALDO_NGDL_TO_PMOL = 27.7;
  readonly FACTOR_PRA_NGMLH_TO_PMOL = 12.9;
  readonly FACTOR_DRC_MUL_TO_NGL = 0.333; // 1 mU/L = 0.333 ng/L

  setReninType(type: string) {
    if (type === 'PRA' || type === 'DRC') {
      this.reninType.set(type as any);
      // Reset unit to default for that type
      this.reninUnit.set(type === 'PRA' ? 'ng/mL/h' : 'mU/L');
    }
  }

  // --- Helper: Get Factor to convert Current Unit -> Standard Base Unit ---
  // Standard Base for Logic:
  // Aldo -> ng/dL (primary for suppression check logic, though DRC ratio uses pmol)
  // PRA -> ng/mL/h
  // DRC -> mU/L

  // However, for ARR Cutoff matching, we need to respect the Table's units.
  // Table PRA: ng/dL / ng/mL/h
  // Table DRC: pmol/L / mU/L
  
  // Helpers to get multiplier: Value * Factor = BaseUnitValue
  private getAldoToNgdlFactor(unit: string): number {
    if (unit === 'ng/dL') return 1;
    if (unit === 'pmol/L') return 1 / this.FACTOR_ALDO_NGDL_TO_PMOL;
    return 1;
  }

  private getAldoToPmolFactor(unit: string): number {
    if (unit === 'pmol/L') return 1;
    if (unit === 'ng/dL') return this.FACTOR_ALDO_NGDL_TO_PMOL;
    return 1;
  }

  private getReninToBaseFactor(type: string, unit: string): number {
    if (type === 'PRA') {
       // Base: ng/mL/h
       if (unit === 'ng/mL/h') return 1;
       if (unit === 'pmol/L/min') return 1 / this.FACTOR_PRA_NGMLH_TO_PMOL;
    } else {
       // Base: mU/L
       if (unit === 'mU/L') return 1;
       if (unit === 'ng/L') return 1 / this.FACTOR_DRC_MUL_TO_NGL; // ng/L * (1/0.333) = mU/L approx
    }
    return 1;
  }

  // --- Conversion Actions (UI Buttons) ---
  convertAldoTo(targetUnit: string) {
    const val = this.aldoValue();
    const currentUnit = this.aldoUnit();
    if (val === null || currentUnit === targetUnit) return;

    // Convert to ng/dL first
    const valNgDl = val * this.getAldoToNgdlFactor(currentUnit);
    
    // Convert to target
    let finalVal = valNgDl;
    if (targetUnit === 'pmol/L') finalVal = valNgDl * this.FACTOR_ALDO_NGDL_TO_PMOL;

    this.aldoValue.set(parseFloat(finalVal.toFixed(2)));
    this.aldoUnit.set(targetUnit);
  }

  convertReninTo(targetUnit: string) {
    const val = this.reninValue();
    const currentUnit = this.reninUnit();
    if (val === null || currentUnit === targetUnit) return;

    // Convert to Base (ng/mL/h or mU/L)
    const baseVal = val * this.getReninToBaseFactor(this.reninType(), currentUnit);

    // Convert to Target
    let finalVal = baseVal;
    if (this.reninType() === 'PRA') {
       if (targetUnit === 'pmol/L/min') finalVal = baseVal * this.FACTOR_PRA_NGMLH_TO_PMOL;
    } else {
       if (targetUnit === 'ng/L') finalVal = baseVal * this.FACTOR_DRC_MUL_TO_NGL;
    }

    this.reninValue.set(parseFloat(finalVal.toFixed(2)));
    this.reninUnit.set(targetUnit);
  }

  // --- Displays ---

  arrResultDisplay = computed(() => {
    const a = this.aldoValue();
    const r = this.reninValue();
    if (a === null || r === null || r === 0) return '---';
    const arr = a / r;
    
    if (arr > 100) return Math.round(arr).toString();
    return arr.toFixed(1);
  });

  // Calculate the cutoff in the CURRENTLY SELECTED units
  arrCutoffDisplay = computed(() => {
    const isImmuno = this.aldoMethod() === 'Immunoassay';
    const type = this.reninType();
    
    if (type === 'PRA') {
      // Base Cutoff is in (ng/dL / ng/mL/h)
      const baseCutoff = isImmuno ? this.CUTOFF_PRA_IMMUNO : this.CUTOFF_PRA_LCMS;
      
      // We are displaying ARR = A_curr / R_curr
      // We want to compare to Cutoff_curr
      // ARR_base = (A_curr * ToNgDl) / (R_curr * ToNgMlh)
      // ARR_base > BaseCutoff
      // (A_curr/R_curr) * (ToNgDl/ToNgMlh) > BaseCutoff
      // ARR_curr > BaseCutoff * (ToNgMlh / ToNgDl)

      const toNgDl = this.getAldoToNgdlFactor(this.aldoUnit());
      const toNgMlh = this.getReninToBaseFactor('PRA', this.reninUnit());

      const cutoff = baseCutoff * (toNgMlh / toNgDl);
      
      if (cutoff >= 100) return Math.round(cutoff).toString();
      return cutoff.toFixed(1);

    } else {
      // DRC
      // Base Cutoff is in (pmol/L / mU/L) from the Guideline Table
      const baseCutoff = isImmuno ? this.CUTOFF_DRC_IMMUNO : this.CUTOFF_DRC_LCMS;
      
      // ARR_base = (A_curr * ToPmol) / (R_curr * ToMuL)
      // ARR_base > BaseCutoff
      // ARR_curr > BaseCutoff * (ToMuL / ToPmol)
      
      const toPmol = this.getAldoToPmolFactor(this.aldoUnit());
      const toMuL = this.getReninToBaseFactor('DRC', this.reninUnit());
      
      const cutoff = baseCutoff * (toMuL / toPmol);

      if (cutoff >= 100) return Math.round(cutoff).toString();
      return cutoff.toFixed(1);
    }
  });

  reninSuppressionCutoffDisplay = computed(() => {
     const type = this.reninType();
     const unit = this.reninUnit();
     const factorToB = this.getReninToBaseFactor(type, unit); // Val * F = Base
     
     const baseCutoff = type === 'PRA' ? this.SUPPRESSION_PRA : this.SUPPRESSION_DRC;
     
     // Cutoff_curr * F = BaseCutoff
     // Cutoff_curr = BaseCutoff / F
     
     const val = baseCutoff / factorToB;
     
     if (val < 0.1) return val.toFixed(3) + ' ' + unit;
     if (val < 10) return val.toFixed(2) + ' ' + unit;
     return val.toFixed(1) + ' ' + unit;
  });

  // --- Core Interpretation Logic ---

  isHighProbability = computed(() => {
    // Hypokalemia + Suppressed Renin + Aldo > 20 ng/dL
    const hypo = (this.potassiumValue() !== null && this.potassiumValue()! < 3.5);
    const reninSuppressed = this.isReninSuppressed();
    
    // Aldo > 20 ng/dL
    const aldoNgDl = this.aldoValue()! * this.getAldoToNgdlFactor(this.aldoUnit());
    const aldoHigh = (this.aldoValue() !== null) && (aldoNgDl >= 20);
    
    return hypo && reninSuppressed && aldoHigh;
  });

  isReninSuppressed = computed(() => {
    const val = this.reninValue();
    if (val === null) return false;
    
    // Convert to base to check
    const baseVal = val * this.getReninToBaseFactor(this.reninType(), this.reninUnit());
    
    if (this.reninType() === 'PRA') return baseVal <= this.SUPPRESSION_PRA;
    return baseVal <= this.SUPPRESSION_DRC;
  });

  interpretation = computed(() => {
    const arrStr = this.arrResultDisplay();
    if (arrStr === '---') return { status: 'unknown' };

    const arrCurr = parseFloat(arrStr);
    const cutoffCurr = parseFloat(this.arrCutoffDisplay());
    
    const arrPositive = arrCurr > cutoffCurr;
    
    // Aldo Elevation Check
    const minAldoNgDl = this.aldoMethod() === 'Immunoassay' ? this.MIN_ALDO_IMMUNO : this.MIN_ALDO_LCMS;
    const currentAldoNgDl = this.aldoValue()! * this.getAldoToNgdlFactor(this.aldoUnit());
    
    const aldoElevated = currentAldoNgDl >= minAldoNgDl;

    if (arrPositive && aldoElevated) {
      return { status: 'positive' };
    }
    return { status: 'negative' };
  });

}