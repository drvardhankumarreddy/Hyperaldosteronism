import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto animate-in fade-in duration-500">
      
      <header class="mb-8">
        <h2 class="text-2xl font-bold text-slate-900">Interfering Medications</h2>
        <p class="text-slate-500 mt-2">Medications that affect Aldosterone and Renin levels, potentially causing false positives or negatives.</p>
      </header>

      <div class="space-y-8">
        
        <!-- Washout Strategy -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
           <div class="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h3 class="font-semibold text-slate-800">Washout / Withdrawal Strategy</h3>
           </div>
           <div class="p-6">
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="border-l-4 border-purple-500 pl-4">
                 <h4 class="font-bold text-slate-900">4 Weeks Before Testing</h4>
                 <p class="text-sm text-slate-600 mt-1">Stop MRAs and ENaC inhibitors:</p>
                 <ul class="list-disc pl-5 mt-2 text-sm text-slate-700">
                   <li>Spironolactone</li>
                   <li>Eplerenone</li>
                   <li>Amiloride</li>
                   <li>Triamterene</li>
                   <li>Drospirenone (in OCPs)</li>
                 </ul>
               </div>
               <div class="border-l-4 border-blue-500 pl-4">
                 <h4 class="font-bold text-slate-900">2 Weeks Before Testing</h4>
                 <p class="text-sm text-slate-600 mt-1">Stop Beta-blockers & Central Agonists:</p>
                 <ul class="list-disc pl-5 mt-2 text-sm text-slate-700">
                   <li>Beta-adrenergic blockers</li>
                   <li>Central alpha-2 agonists (Clonidine, Methyldopa)</li>
                   <li>Renin Inhibitors (Aliskiren)</li>
                 </ul>
               </div>
             </div>
           </div>
        </div>

        <!-- Effects Table -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
           <div class="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h3 class="font-semibold text-slate-800">Effects on Renin & Aldosterone</h3>
           </div>
           <div class="overflow-x-auto">
             <table class="w-full text-sm text-left">
               <thead class="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                 <tr>
                   <th class="px-6 py-3">Medication Class</th>
                   <th class="px-6 py-3">Effect on Renin</th>
                   <th class="px-6 py-3">Effect on Aldo</th>
                   <th class="px-6 py-3">Screening Impact</th>
                 </tr>
               </thead>
               <tbody class="divide-y divide-slate-100">
                 <tr class="bg-white hover:bg-slate-50">
                   <td class="px-6 py-4 font-medium text-slate-900">Beta-Blockers</td>
                   <td class="px-6 py-4 text-red-600">↓↓ Decrease</td>
                   <td class="px-6 py-4 text-red-600">↓ Decrease</td>
                   <td class="px-6 py-4 text-orange-600 font-semibold">False Positive</td>
                 </tr>
                 <tr class="bg-white hover:bg-slate-50">
                   <td class="px-6 py-4 font-medium text-slate-900">Central Alpha-2 Agonists (Clonidine)</td>
                   <td class="px-6 py-4 text-red-600">↓↓ Decrease</td>
                   <td class="px-6 py-4 text-red-600">↓ Decrease</td>
                   <td class="px-6 py-4 text-orange-600 font-semibold">False Positive</td>
                 </tr>
                 <tr class="bg-white hover:bg-slate-50">
                   <td class="px-6 py-4 font-medium text-slate-900">MRAs (Spironolactone/Eplerenone)</td>
                   <td class="px-6 py-4 text-green-600">↑↑ Increase</td>
                   <td class="px-6 py-4 text-green-600">↑ Increase</td>
                   <td class="px-6 py-4 text-orange-600 font-semibold">False Negative</td>
                 </tr>
                 <tr class="bg-white hover:bg-slate-50">
                   <td class="px-6 py-4 font-medium text-slate-900">ACE Inhibitors / ARBs</td>
                   <td class="px-6 py-4 text-green-600">↑↑ Increase</td>
                   <td class="px-6 py-4 text-red-600">↓ Decrease</td>
                   <td class="px-6 py-4 text-orange-600 font-semibold">False Negative</td>
                 </tr>
                 <tr class="bg-white hover:bg-slate-50">
                   <td class="px-6 py-4 font-medium text-slate-900">Diuretics (Thiazide/Loop)</td>
                   <td class="px-6 py-4 text-green-600">↑↑ Increase</td>
                   <td class="px-6 py-4 text-green-600">↑ Increase</td>
                   <td class="px-6 py-4 text-orange-600 font-semibold">False Negative</td>
                 </tr>
                  <tr class="bg-white hover:bg-slate-50">
                   <td class="px-6 py-4 font-medium text-slate-900">SGLT2 Inhibitors</td>
                   <td class="px-6 py-4 text-green-600">↑ Increase</td>
                   <td class="px-6 py-4 text-gray-500">Variable</td>
                   <td class="px-6 py-4 text-orange-600 font-semibold">Possible False Negative</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>

        <!-- Safe Alternatives -->
        <div class="bg-green-50 border border-green-200 rounded-xl p-6">
          <h4 class="font-semibold text-green-900 mb-2">Medications with Minimal Effect (Preferred for Screening)</h4>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-800">
            <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-green-500"></div> Verapamil (Slow release)</li>
            <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-green-500"></div> Hydralazine</li>
            <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-green-500"></div> Prazosin / Doxazosin</li>
            <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-green-500"></div> Moxonidine (Wait, check text. Table 6: "Moxonidine" is used as replacement?)</li>
          </ul>
          <p class="text-xs text-green-700 mt-4">*Note: Hydralazine should ideally be used with Verapamil to avoid reflex tachycardia.</p>
        </div>

      </div>
    </div>
  `
})
export class MedicationsComponent {}