import { MenuManager } from './menu';
import { MainProcessBridge } from './bridge';

export class RendererApp {
  private menuManager: MenuManager;
  protected mainProcessBridge: MainProcessBridge;

  constructor() {
    this.mainProcessBridge = new MainProcessBridge();
    this.menuManager = new MenuManager(this.mainProcessBridge);
  }
}

let h: Element = document.createElement('h1');
h.innerHTML = 'Hello world!';
document.body.appendChild(h);