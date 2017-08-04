
let iframe: HTMLIFrameElement = document.createElement('iframe');
document.body.appendChild(iframe);
iframe.contentDocument.body.setAttribute('contenteditable', '');
iframe.contentDocument.body.innerHTML = `
  <div>What's up!</div>
`;