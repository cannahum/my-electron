/// <reference path="../renderer.d.ts" />
// import { SpellCheckHandler, ContextMenuListener, ContextMenuBuilder } from 'spellchecker';
import * as spellchecker from 'spellchecker';

export class TextServices {
  private spellChecker: spellchecker.SpellCheckHandler;

  constructor() {
    this.spellChecker = window.spellCheckHandler = new spellchecker.SpellCheckHandler();
    this.attach();
  }

  private attach(): void {
    this.spellChecker.attachToInput();
    this.spellChecker.switchLanguage('en-US');

    let contextMenuBuilder = new spellchecker.ContextMenuBuilder(this.spellChecker);
    let contextMenuListener = new spellchecker.ContextMenuListener((info: any) => {
      contextMenuBuilder.showPopupMenu(info);
    });
  }
}
