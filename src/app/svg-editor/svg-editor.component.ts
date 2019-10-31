import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as brace from 'brace';
import './svg-angular-mode.js';

@Component({
    selector: 'svg-editor',
    template: `
        <div class="editor-outer">
            <div id="svg-editor"></div>
        </div>`,
    styleUrls: ['./svg-editor.component.css']
})
export class SvgEditorComponent implements OnInit {
    private _content: string;
    private editor;

    @Input()
    set content(content:string) {
        this._content = content;
        this.updateValue();
    }
    get content(): string { return this._content; }

    @Output() change = new EventEmitter<string>(true);

    ngOnInit() {
        this.editor = brace.edit('svg-editor');
        this.editor.setShowPrintMargin(false);
        this.editor.getSession().setMode("ace/mode/angular-svg");
        this.editor.container.style.lineHeight = 1.4;
        this.editor.renderer.updateFontSize();
        this.editor.on("change", ()=>{
            this.change.emit(this.editor.getValue());
        });
        this.updateValue();
    }

    updateValue():void {
        if (!this.editor) {
            return;
        }
        this.editor.setValue(this.content);
    }
}