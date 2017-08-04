**Bug: Title is clear I hope**

**TypeScript Version:**  2.4.2

**Code**
On service.d.ts

```typescript
declare type EditableElement = (HTMLInputElement | HTMLIFrameElement | HTMLTextAreaElement);
```


On service.ts

```typescript
function replaceWord(node: EditableElement, newWord: string) {
  // some checks about the user's click and selected
  // range on the input element... and then
  node.setRangeText(newWord);
}
```

Visual Studio Code /* Typescript 2.4.2 */ immediately marks it as an error,


`
[ts]
Property 'setRangeText' does not exist on type 'HTMLInputElement | HTMLTextAreaElement'.
  Property 'setRangeText' does not exist on type 'HTMLInputElement'.
`

Then I run it on my compile script

Webpack - webpack@3.0.0

Loader - awesome-typescript-loader@3.2.2

Typescript - typescript@2.4.2



**Expected behavior:**
No errors are expected. As per
https://developer.mozilla.org/en/docs/Web/API/HTMLInputElement
this API seems available.

**Actual behavior:**

`
ERROR in [at-loader] ./path/to/service.ts:130:14
    TS2339: Property 'setRangeText' does not exist on type 'HTMLInputElement | HTMLTextAreaElement'.
  Property 'setRangeText' does not exist on type 'HTMLInputElement'.
`
