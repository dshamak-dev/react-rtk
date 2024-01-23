export const preventBrowserHistory = () => {
  function disableBack() {
    window.history.forward();
  }
  setTimeout(disableBack, 0);
  window.onunload = function () {
    null;
  };
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };
};
