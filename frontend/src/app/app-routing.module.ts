import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VulnerabilityViewComponent } from './pages/vulnerability-view/vulnerability-view.component';

const routes: Routes = [
  { path: '', component: VulnerabilityViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
