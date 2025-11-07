import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: "tests/web-test-runner/*.test.html",
  coverage: true,
  nodeResolve: true,
  browsers: [
    playwrightLauncher({
      product: 'firefox', // Use Firefox instead of Chrome (web-test-runner’s default), because Firefox doesn’t have a native implementation of 'ariaNotify' (as of 2025-11-07), so we can test the polyfill in it.
      launchOptions: { headless: true }
    }),
  ],
  plugins: [
    {
      name: "include-polyfill",
      transform(context) {
        if (context.response.is("html")) {
          return context.body.replace(
            /<\/body>/,
            `
  <script src="./arianotify-polyfill.js"></script>
  <script type="module">
    import { runTests } from "@web/test-runner-mocha";
    import { tests } from "./arianotify-polyfill.test.js";
    runTests(tests);
  </script>
</body>
`
          );
        }
      },
    },
  ],
};