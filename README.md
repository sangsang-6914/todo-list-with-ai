# Todo List with AI

미니멀하고 깔끔한 투두리스트 웹 앱입니다.

## 주요 기능

- 할 일 추가 / 완료 토글 / 삭제
- 필터링 (전체 / 완료 / 미완료)
- localStorage를 통한 데이터 영속화
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
    │   ├── types.ts           # 공통 타입 (Todo, Filter)
    │   ├── useLocalStorage.ts # localStorage 커스텀 훅
    │   ├── TodoList.tsx       # 상태 관리 컨테이너
    │   ├── TodoHeader.tsx     # 타이틀 + 완료 카운터
    │   ├── TodoInput.tsx      # 입력 폼
    │   ├── TodoFilter.tsx     # 필터 탭
    │   └── TodoItem.tsx       # 개별 투두 카드
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
```

## useLocalStorage 훅

`useSyncExternalStore`를 활용하여 localStorage를 React 외부 스토어로 다루는 커스텀 훅입니다.

- **SSR-safe**: `getServerSnapshot`으로 서버에서는 초기값을 반환하여 hydration mismatch 방지
- **참조 안정성**: raw 문자열 캐싱으로 `JSON.parse`의 매번 새 참조 생성 문제를 해결하여 무한 루프 방지
- **탭 간 동기화**: `StorageEvent` 구독으로 다른 탭에서의 변경도 실시간 반영
- **useState 호환 인터페이스**: 값 직접 전달과 업데이터 함수 모두 지원

```typescript
const [todos, setTodos] = useLocalStorage<Todo[]>("key", []);

setTodos([newTodo]);                     // 직접 값 전달
setTodos((prev) => [...prev, newTodo]);  // 업데이터 함수
```

## 빌드

```bash
npm run build
npm start
```
