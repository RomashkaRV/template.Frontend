// Выполняется синхронно в <head>, ДО первой отрисовки body:
// ставит класс темы на <html>, поэтому мигания нет.
// Тема: сохранённая в localStorage, иначе системная (prefers-color-scheme).
// Чтение localStorage в отдельном try: в приватном режиме он может быть недоступен.
export const themeScript = `(function(){var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t})();`;
