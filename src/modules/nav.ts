export function loadPage(page: any) {
  let main = __uiFiles__.main;
  let login = __uiFiles__.login;
  if (page === "login") {
    figma.showUI(login, { themeColors: true, /* other options */ })
  } else {
    figma.showUI(main, { themeColors: true, /* other options */ })
  }
}