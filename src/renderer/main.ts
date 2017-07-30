import { MenuManager } from './menu';
import { MainProcessBridge } from './bridge';
import { TextServices } from './services/spell_checker';

let input: HTMLInputElement = document.createElement('input');
input.setAttribute('type', 'text');
document.body.appendChild(input);

export class RendererApp {
  private menuManager: MenuManager;
  protected mainProcessBridge: MainProcessBridge;
  private textServices: TextServices;

  constructor() {
    this.mainProcessBridge = new MainProcessBridge();
    // this.menuManager = new MenuManager(this.mainProcessBridge);
    this.textServices = new TextServices();
  }
}

(<any>window).rendererApp = new RendererApp();