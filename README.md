# arianotify-polyfill

Polyfill for the [ARIA Notification API](https://github.com/WICG/accessible-notifications/blob/main/README.md)

The goal of this library is to polyfill `ariaNotify` so that it can be used seamlessly across browsers that support the native functionality, and those that don't. This adds the `Element.prototype.ariaNotify` and/or `Document.prototype.ariaNotify` functions if they do not exist, emulating the native functionality.

This is used in production on github.com.

## Background 

In browsers where `ariaNotify` is supported it will emit a notification event. In browsers where it isn't supported this library will create a "fake" element that is an aria-live region, insert it into the DOM, and modify the text content of the element to place the given message in, achieving a similar effect to the native functionality.

## Requirements

This is only meant to be used in a browser context. It should not be used on the server. To install this you will likely need `npm`.

```sh
$ npm i @github/arianotify-polyfill
```

In your JavaScript you can introduce the polyfill using a "bare" import:

```js
import "@github/arianotify-polyfill"
```

Then continue to use `ariaNotify` as if it were supported everywhere. A small contrived example:

```js
button.ariaNotify("Saved")
```

## License 

This project is licensed under the terms of the MIT open source license. Please refer to [MIT](./LICENSE) for the full terms.

## Maintainers 

The @github/accessibility and @github/primer teams maintain this library.

## Support

This library is provided "as is". Please feel free to file issues; however, we offer no time frame for correspondence or resolution of any issues.

## Acknowledgement

Special thanks to Microsoft and the ARIA Working Group for making `ariaNotify` a possibility.
