interface SpellCheckProvider extends Electron.Provider {
  [index: string]: any
}

declare class TextServices {
  private spellchecker: SpellCheckProvider;
  private selection: {
    isMisspelled: boolean;
    spellingSuggestions: string[];
  }
  private currentTarget: (HTMLElement | Window);
  private attachEvents(target: (HTMLElement | Window)): void
  private resetSelection(): void;
  private replaceMisspelledWord(newWord: string): void;
}

declare type EditableElement = (HTMLInputElement | HTMLIFrameElement | HTMLTextAreaElement);

interface HTMLInputElement {
  setRangeText: (input: string) => void
}

interface HTMLTextAreaElement {
  setRangeText: (input: string) => void
}

declare module 'spellchecker' {
  class SpellChecker {
    static isMisspelled: (word: string) => boolean;
    static getCorrectionsForMisspelling: (word: string) => string[];
    [index: string]: any
  }
}