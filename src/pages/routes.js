const context = require.context(".", true, /route.js$/);
const routes = context.keys().map((path) => {
  return context(path).default;
});
export default routes;
