import { BrowserModule } from '@angular/platform-browser';
import { NgModule, COMPILER_OPTIONS, Compiler, CompilerFactory } from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DynamicTemplateView } from './dynamic/dynamicTemplateView.component';
import { DynamicTypeBuilder } from './dynamic/typeBuilder';
import { SvgEditorComponent } from './svg-editor/svg-editor.component';
import { DataTools } from './data-tools.service';

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [
      AppComponent,
      SvgEditorComponent,
	    DynamicTemplateView
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [
    DynamicTypeBuilder,
    DataTools,
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
