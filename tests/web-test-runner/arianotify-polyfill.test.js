import { expect } from "@esm-bundle/chai";

function spyOn(object, methodName) {
  const calls = [];
  const method = object[methodName];

  object[methodName] = function (...args) {
    calls.push(args);
    return method.call(this, ...args);
  };

  return calls;
}

export async function tests() {
  describe("ariaNotify polyfill", () => {
    let container;

    beforeEach(() => {
      container = document.querySelector("[data-should-contain-live-region]");
      if (!container) {
        throw new Error("Expected a live-region test container");
      }

      for (const liveRegion of Array.from(container.children).filter((node) =>
        node.tagName.match(/-live-region/i)
      )) {
        liveRegion.remove();
      }
    });

    it("routes polite messages to the polite live region", async () => {
      container.ariaNotify("Normal-priority message");
      const liveRegions = Array.from(container.children).filter((node) =>
        node.tagName.match(/-live-region/i)
      );
      expect(liveRegions).to.have.length(1);

      const liveRegion = liveRegions[0];
      expect(liveRegion.tagName.match(/^polite-live-region/i)).to.not.equal(null);
      expect(liveRegion.ariaLive).to.equal("polite");

      const calls = spyOn(liveRegion, "handleMessage");

      await new Promise((resolve) => setTimeout(resolve, 300));
      expect(calls).to.have.length(1);
      expect(calls[0][1]).to.equal("Normal-priority message");
    });

    it("routes assertive messages to the assertive live region", async () => {
      container.ariaNotify("High-priority message", { priority: "high" });
      const liveRegions = Array.from(container.children).filter((node) =>
        node.tagName.match(/-live-region/i)
      );
      expect(liveRegions).to.have.length(1);

      const liveRegion = liveRegions[0];
      expect(liveRegion.tagName.match(/^assertive-live-region/i)).to.not.equal(null);
      expect(liveRegion.ariaLive).to.equal("assertive");

      const calls = spyOn(liveRegion, "handleMessage");

      await new Promise((resolve) => setTimeout(resolve, 300));
      expect(calls).to.have.length(1);
      expect(calls[0][1]).to.equal("High-priority message");
    });
  });
}
