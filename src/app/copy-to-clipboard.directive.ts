import { Directive, HostListener, Input, Renderer2, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCopyToClipboard]'
})
export class CopyToClipboardDirective implements AfterViewInit {
  @Input('appCopyToClipboard') textToCopy!: string;
  @Input() errorMessage: string = 'Failed to copy!';

  private icon!: HTMLSpanElement;
  private messageBox!: HTMLSpanElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
   
    this.icon = this.renderer.createElement('i');
    this.renderer.addClass(this.icon, 'fas');
    this.renderer.addClass(this.icon, 'fa-clipboard');
    this.renderer.setStyle(this.icon, 'margin-left', '8px');
    this.renderer.setStyle(this.icon, 'cursor', 'pointer');
    this.renderer.setStyle(this.icon, 'color', 'black');
    this.renderer.setStyle(this.icon, 'position', 'relative');
    this.renderer.appendChild(this.el.nativeElement, this.icon);


    this.messageBox = this.renderer.createElement('span');
    this.renderer.addClass(this.messageBox, 'clipboard-message');
    this.renderer.setStyle(this.messageBox, 'display', 'none');
    this.renderer.setStyle(this.messageBox, 'background', '#000');
    this.renderer.setStyle(this.messageBox, 'color', '#fff');
    this.renderer.setStyle(this.messageBox, 'padding', '4px 8px');
    this.renderer.setStyle(this.messageBox, 'border-radius', '4px');
    this.renderer.setStyle(this.messageBox, 'font-size', '12px');
    this.renderer.setStyle(this.messageBox, 'position', 'absolute');
    this.renderer.setStyle(this.messageBox, 'top', '50%');
    this.renderer.setStyle(this.messageBox, 'left', '120%'); 
    this.renderer.setStyle(this.messageBox, 'transform', 'translateY(-50%)');
    this.renderer.setStyle(this.messageBox, 'white-space', 'nowrap');
    this.renderer.appendChild(this.icon, this.messageBox);
  }

  @HostListener('click')
  copyText() {
    const textToCopy = this.textToCopy || this.el.nativeElement.innerText;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        this.showMessage('Copied to clipboard!', 'success');
        this.changeIconColor('skyblue');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
        this.showMessage(this.errorMessage, 'error');
        this.changeIconColor('red');
      });
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.renderer.setProperty(this.messageBox, 'innerText', message);
    this.renderer.setStyle(this.messageBox, 'display', 'inline');
    setTimeout(() => {
      this.renderer.setStyle(this.messageBox, 'display', 'none');
    }, 2000);
  }

  private changeIconColor(color: string) {
    this.renderer.setStyle(this.icon, 'color', color);
    setTimeout(() => {
      this.renderer.setStyle(this.icon, 'color', 'black');
    }, 2000);
  }
}
