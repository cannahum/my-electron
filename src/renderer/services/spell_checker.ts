/// <reference path="../renderer.d.ts"/>
import { webFrame } from 'electron';
var SpellCheckProvider = require('spellchecker');

export class TextServices {
  private spellchecker: SpellCheckProvider;

  constructor() {
    this.spellchecker = new SpellCheckProvider('en-US');
    webFrame.setSpellCheckProvider('en-US', true, this.spellchecker);

    this.attach();
  }

  private attach(): void {
    this.spellchecker.on('misspelling', (suggestions: string[]) => {
      console.log('The text at the site of the cursor is misspelled.',
        'Maybe the user meant to type:', suggestions);
    });
  }

}
