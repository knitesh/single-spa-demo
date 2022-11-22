import {
  registerApplication,
  start,
  pathToActiveWhen,
  navigateToUrl,
} from "single-spa";
import { auth$ } from "@nitex/utility";

let authenticated = false;

const ROUTES = {
  ROOT: "/",
  NAVBAR: "/navbar",
  DASHBOARD: "/dashboard",
};

registerApplication({
  name: "@nitex/app-nav-bar",
  app: () => System.import("@nitex/app-nav-bar"),
  activeWhen: ["/"],
  customProps: { domElement: document.getElementById("nav-container") },
});

let activeWhen = pathToActiveWhen("/", true);
// let activeWhen = pathToActiveWhen("/", true);
registerApplication({
  name: "@nitex/app-home",
  app: () => System.import("@nitex/app-home"),
  activeWhen: activeWhen,
  customProps: { domElement: document.getElementById("main-container") },
});

activeWhen = pathToActiveWhen("/dashboard", true);

registerApplication({
  name: "@nitex/app-dashboard",
  app: () => System.import("@nitex/app-dashboard"),
  activeWhen: activeWhen,
  customProps: { domElement: document.getElementById("main-container") },
});

activeWhen = pathToActiveWhen("/account", true);

registerApplication({
  name: "@nitex/app-account-detail",
  app: () => System.import("@nitex/app-account-detail"),
  activeWhen: activeWhen,
  customProps: { domElement: document.getElementById("main-container") },
});

auth$.subscribe(({ sessionToken }) => {
  authenticated = !!sessionToken;
  if (!authenticated && window.location.pathname !== ROUTES.NAVBAR)
    navigateToUrl(ROUTES.ROOT);
  if (authenticated && window.location.pathname === ROUTES.NAVBAR)
    navigateToUrl(ROUTES.DASHBOARD);
});

start({
  urlRerouteOnly: true,
});
