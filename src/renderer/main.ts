import { MenuManager } from './menu';
import { MainProcessBridge } from './bridge';
import { TextServices } from './services/spell_checker';

let input1: HTMLInputElement = document.createElement('input');
input1.setAttribute('type', 'text');
document.body.appendChild(input1);

let input2: HTMLInputElement = document.createElement('input');
input2.setAttribute('type', 'text');
document.body.appendChild(input2);

export class RendererApp {
  private menuManager: MenuManager;
  protected mainProcessBridge: MainProcessBridge;
  public textServices: TextServices;

  constructor() {
    this.mainProcessBridge = new MainProcessBridge();
    // this.menuManager = new MenuManager(this.mainProcessBridge);
    this.textServices = new TextServices();
  }
}

(<any>window).rendererApp = new RendererApp();