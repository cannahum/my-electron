/// <reference path="./spellchecker.d.ts" />

declare class RendererApp {
  private menuManager: MenuManager;
  protected mainProcessBridge: MainProcessBridge;
  public textServices: TextServices;
}

declare class MenuManager {
  private electronMenu: Electron.Menu;
  private mainProcessBridge: MainProcessBridge;
}

declare class MainProcessBridge {}

