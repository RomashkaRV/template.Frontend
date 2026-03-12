# Frontend

Проект на **Next.js 15 + React 19 + TypeScript 5**, со строгой настройкой качества кода.
Используются единые конфиги из пакета [`@romashka_rv/frontend-config`](https://github.com/RomashkaRV/frontend.configs).

---

## 🚀 Стек технологий

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Sass (SCSS)](https://sass-lang.com/)
- [ESLint 9](https://eslint.org/) + [Stylelint 16](https://stylelint.io/)
- [Prettier 3](https://prettier.io/)
- [Commitlint](https://commitlint.js.org/)

---

## ⚙️ Требования

- **Node.js >= 20.11.0**
- npm или pnpm

---

## 📦 Установка

### Локальная разработка

```bash
npm install
```

```bash
npm run dev
```

* Сервер стартует на `http://localhost:3000`

---

## Билд для продакшена (Standalone)

1. Создать продакшен-билд:

```bash
npm run build
```

2. После успешного билда появится папка:

```
.next/standalone/
```

3. Для запуска standalone сервера:

* Если `.next/static` находится **не внутри standalone**, необходимо скопировать её:

```bash
cp -r ../static ./standalone/.next/
```

```bash
cd .next/standalone
$env:PORT=3000; node server.js   # Windows PowerShell
# или на Linux/macOS:
PORT=3000 node server.js
```

* Сервер отдаёт все страницы и статические файлы (`/_next/static/...`)
* Перейти в браузере: `http://localhost:3000`
---

## Линтинг и качество кода

```bash
# Проверка TypeScript и SCSS
npm run quality

# Автоисправление
npm run quality:fix
```

Husky + lint-staged автоматически применяют исправления перед коммитом.

