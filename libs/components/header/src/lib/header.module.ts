import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {ToolbarModule} from 'primeng/toolbar';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [CommonModule, ButtonModule, InputTextModule, ToolbarModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
