// @ts-check

for (const prototype of [Element.prototype, Document.prototype]) {
  Object.defineProperty(prototype, "ariaNotify", {
    configurable: true,
    writable: true,
    value() {
      throw new Error("Expected tests to use the ariaNotify polyfill");
    },
  });
}

/** @type {typeof globalThis & {__ariaNotifyPolyfillForce?: boolean}} */ (
  globalThis
).__ariaNotifyPolyfillForce = true;
