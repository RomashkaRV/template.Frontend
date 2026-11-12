# Frontend

Проект на **Next.js 16 + React 19 + TypeScript 6**, со строгой настройкой качества кода.
Используются единые конфиги из пакета [`@romashka_rv/frontend-config`](https://github.com/RomashkaRV/frontend.configs).

---

## 🚀 Стек технологий

- [Next.js 16](https://nextjs.org/) (Turbopack, Cache Components)
- [React 19](https://react.dev/)
- [TypeScript 6](https://www.typescriptlang.org/)
- [Sass (SCSS)](https://sass-lang.com/)
- [ESLint 10](https://eslint.org/) + [Stylelint 17](https://stylelint.io/)
- [Prettier 3](https://prettier.io/)
- [Commitlint](https://commitlint.js.org/)

---

## ⚙️ Требования

- **Node.js >= 22.22.1** (см. `.nvmrc`)
- npm

---

## 📦 Установка

### Локальная разработка

```bash
npm install
```

```bash
npm run dev
```

- Сервер стартует на `http://localhost:3000`

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

- Если `.next/static` находится **не внутри standalone**, необходимо скопировать её:

```bash
cp -r ../static ./standalone/.next/
```

```bash
cd .next/standalone
$env:PORT=3000; node server.js   # Windows PowerShell
# или на Linux/macOS:
PORT=3000 node server.js
```

- Сервер отдаёт все страницы и статические файлы (`/_next/static/...`)
- Перейти в браузере: `http://localhost:3000`

---

## Линтинг и качество кода

```bash
# Проверка ESLint + Stylelint + Prettier
npm run quality

# Проверка типов
npm run typecheck

# Автоисправление
npm run quality:fix
```

Форматирование (отступы, кавычки и т. д.) задаёт единый `prettier.config.js` из
`@romashka_rv/frontend-config`, он же используется ESLint и редактором.
Husky + lint-staged автоматически применяют исправления к изменённым файлам перед коммитом,
а commitlint проверяет формат сообщения (`feature: ...`, `fix: ...`).
