export class IdeConsole {
  console?: HTMLElement | null;

  setConsole(console?: HTMLElement | null): void {
    this.console = console;
  }

  log(message: string): void {
    if (this.console) {
      this.console.innerHTML += message + '<br>';
    }
  }

  clear(): void {
    if (this.console) {
      this.console.innerHTML = '';
    }
  }
}
