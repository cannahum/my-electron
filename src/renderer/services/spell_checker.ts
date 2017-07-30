/// <reference path="../renderer.d.ts"/>
import { webFrame, remote } from 'electron';
let { Menu, MenuItem } = remote;
var SpellCheckProvider = require('spellchecker');

export class TextServices {
  private spellchecker: SpellCheckProvider;
  private selection: {
    isMisspelled: boolean;
    spellingSuggestions: string[];
  }
  private currentTarget: (HTMLElement | Window);

  constructor() {
    this.spellchecker = new SpellCheckProvider('en-US');
    webFrame.setSpellCheckProvider('en-US', true, this.spellchecker);

    this.attachEvents(window);
  }

  /**
   * Changes the state of the instance of this class. 
   * If the focus (currentTarget) is on window, but then the user clicks inside a contenteditable iframe, we change the current target to the iframe. 
   * This is because we set event listeners for click and context menu. If the user clicks inside the iframe, the window object can't catch it.
   * 
   * @param target Target for clicks. Could be general window object, or an iframe, or maybe even form elements, where spell check can be done.
   */
  private attachEvents(target: (HTMLElement | Window)): void {
    // clicking the window should reset the suggestion state
    window.addEventListener('mousedown', (e: MouseEvent) => {
      console.log('[TextServices]::mousedown', e);
      if (e.buttons === 1) {
        let target: HTMLElement = e.target as HTMLElement;

        // Is this click about us? Was it on a typed text?
        this.resetSelection();
      }
    });

    // spelling suggestions are shown if the user right-clicks.
    window.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      console.log('[TextServices]::contextmenu', e);

      let node: HTMLElement = e.target as HTMLElement;

      // Is this click about us? Was it on a typed text?
      let showMenu: boolean = false;
      while (node) {
        if (node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable) {
          showMenu = true;
          break;
        }
        node = <HTMLElement><Node>node.parentNode;
      }

      // show menu
      if (showMenu) {
        let menu: Electron.Menu = Menu.buildFromTemplate(
          this.selection.spellingSuggestions.length ? this.selection.spellingSuggestions.map((suggestion: string) => {
            return {
              label: suggestion,
              click: (e: Electron.MenuItem) => {
                this.replaceMisspelledWord(e.label);
              }
            }
          }) : [1, 2, 3].map((n) => {
            return {
              label: `help ${n}`,
              click: (e: Electron.MenuItem) => {
                this.replaceMisspelledWord(e.label);
              }
            }
          })
        );

        setTimeout(() => {
          menu.popup(remote.getCurrentWindow());
        }, 30);
      }
    });

    this.spellchecker.on('misspelling', (suggestions: string[]) => {

      if (window.getSelection().toString()) {
        this.selection = {
          isMisspelled: true,
          spellingSuggestions: suggestions.slice(0, 6)
        }
      }
    });
  }

  private resetSelection(): void {
    this.selection = {
      isMisspelled: false,
      spellingSuggestions: []
    }
  }

  private replaceMisspelledWord(newWord: string): void {
    console.log('[TextService][replaceMisspelledWord]:', newWord);

    let selection: Selection, range: Range;
    selection = window.getSelection();
    if (selection.rangeCount) {
      range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(newWord));
    }
    this.resetSelection();
  }

}
