# Todo List with AI

미니멀하고 깔끔한 투두리스트 웹 앱입니다.

## 주요 기능

- 할 일 추가 / 완료 토글 / 삭제
- 필터링 (전체 / 완료 / 미완료)
- 모바일 반응형 UI

## 기술 스택

- [Next.js](https://nextjs.org) 16 (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) 4

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 프로젝트 구조

```
src/
└── app/
    ├── components/
    │   └── TodoList.tsx    # 투두리스트 클라이언트 컴포넌트
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
```

## 빌드

```bash
npm run build
npm start
```
