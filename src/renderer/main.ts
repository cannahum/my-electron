import { MenuManager } from './menu';
import { MainProcessBridge } from './bridge';
import SpellChecker from './services/SpellChecker';

import './services/examples/iframe';

export class RendererApp {
  private menuManager: MenuManager;
  protected mainProcessBridge: MainProcessBridge;
  // public textServices: TextServices;
  public spellChecker: SpellChecker;

  constructor() {
    this.mainProcessBridge = new MainProcessBridge();
    // this.menuManager = new MenuManager(this.mainProcessBridge);
    // this.textServices = new TextServices();
    // this.textServices.followElement(input1);
    this.spellChecker = new SpellChecker();
    this.spellChecker.enable();
  }
}

(<any>window).rendererApp = new RendererApp();