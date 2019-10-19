import { BrowserModule } from '@angular/platform-browser';
import { NgModule, COMPILER_OPTIONS, Compiler, CompilerFactory } from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DynamicTemplateView } from './dynamic/dynamicTemplateView.component';
import { DynamicTypeBuilder } from './dynamic/typeBuilder';

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [
      AppComponent,
	  DynamicTemplateView
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [
    DynamicTypeBuilder,
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
