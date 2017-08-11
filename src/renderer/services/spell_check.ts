const SpellChecker = require('spellchecker');
interface SpellChecker {
  [index: string]: any;
};

interface TypedWordData {
  isMisspelled: boolean;
  suggestions: string[];
}

export class TextServices {
  private sc: SpellChecker;
  private elementsToTypedCorpus: Map<HTMLElement, Map<string, TypedWordData>>;

  constructor(language: string = 'en-US') {
    this.sc = new SpellChecker(language);
    this.elementsToTypedCorpus = new Map();
  }

  public followElement(el: HTMLElement): boolean {
    if (!this.isEditableElement(el)) {
      return false;
    }

    this.elementsToTypedCorpus.set(el, new Map());
    this.attachEvents(el);

    return true;
  }

  public unfollowElement(el: HTMLElement): void {
    this.elementsToTypedCorpus.delete(el);
  }


  private attachEvents(el: EditableElement): void {
    el.addEventListener('keydown', (e: KeyboardEvent) => {
      console.log('[TextServices][keydown', e);
      if (e.code === 'Space') {
        // then there is a word to be checked. Right?
        this.reviewEditedElement(el);
      }
    })
  }

  private isEditableElement(node: HTMLElement | null): node is EditableElement {
    return node !== null && (!!node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable);
  }

  private reviewEditedElement(el: EditableElement): void {
    let elementBin: Map<string, TypedWordData> = this.elementsToTypedCorpus.get(el) || new Map();

    if (!elementBin || elementBin === null) {
      console.warn('this element isnt being followed.', el);
      elementBin = new Map();
      this.elementsToTypedCorpus.set(el, new Map());
    }

    el.innerText.split(' ').map((word) => {
      if (this.sc.isMisspelled(word)) {
        console.log(`${word} : was misspelled.`);

        if (!elementBin.has(word)) {
          let suggestions = this.sc.getCorrectionsForMisspelling(word);
          console.log('suggestions: ', suggestions);
          elementBin.set(word, {
            isMisspelled: true,
            suggestions
          });
        }
      }
    })
  }
}