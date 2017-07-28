import { MenuManager } from './menu';
import { MainProcessBridge } from './bridge';
import { TextServices } from './services/spell_checker';

let h: Element = document.createElement('h1');
h.innerHTML = 'Hello world!';
document.body.appendChild(h);

export class RendererApp {
  private menuManager: MenuManager;
  protected mainProcessBridge: MainProcessBridge;
  private textServices: TextServices;

  constructor() {
    this.mainProcessBridge = new MainProcessBridge();
    this.menuManager = new MenuManager(this.mainProcessBridge);
    this.textServices = new TextServices();
  }
}