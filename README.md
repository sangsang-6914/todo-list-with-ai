# Todo List with AI

미니멀하고 깔끔한 투두리스트 웹 앱입니다.

## 왜 만들었는가

할 일 목록은 **가장 단순해 보이지만**, 상태(추가·완료·삭제·필터)와 **저장·동기화**가 얽이면 곧바로 엣지 케이스가 나옵니다. 이 프로젝트는 UI는 **단순하게** 두되, 브라우저 저장소와 React를 맞물릴 때 흔한 문제(**SSR·hydration·탭 간 일관성·무한 루프**)를 **한 번에 다루는 훅**으로 정리하는 것을 목표로 했습니다. 저장소 이름에 “AI”가 들어가 있어도, **앱 기능의 중심은 클라이언트 투두와 localStorage 패턴**이며 별도의 생성형 AI API 호출은 포함하지 않습니다.

## 어떤 문제를 해결하려고 했는가

| 문제 | 이 앱에서의 방향 |
|------|------------------|
| 새로고침하면 할 일이 사라짐 | **localStorage**로 영속화 |
| 전체/완료/미완료만 보고 싶음 | **필터 탭**으로 뷰 분리 |
| 서버 렌더와 클라이언트 초기값이 달라 깨짐 | `useSyncExternalStore` + **`getServerSnapshot`**으로 SSR-safe |
| 다른 탭에서 고친 내용이 반영 안 됨 | **`StorageEvent`** 구독으로 탭 간 동기화 |
| `JSON.parse`마다 새 참조로 리렌더 폭주 | **raw 문자열 캐싱** 등으로 참조 안정성 확보 |

즉, “**가벼운 투두 UI**”와 “**localStorage를 React답게 쓰는 레이어**”를 같이 보여 주는 예제에 가깝습니다.

## 기술 스택과 선정 이유

**백엔드 없이** 브라우저만으로 완결되는 앱에 맞춘 선택입니다.

### [Next.js](https://nextjs.org/) 16 (App Router)

- 라우팅·레이아웃·빌드가 한 번에 잡혀 **데모·학습용** 프로젝트를 빠르게 올리기 좋습니다.
- App Router 환경에서도 **클라이언트 컴포넌트 + 외부 스토어** 패턴을 연습하기 적합합니다.

### [TypeScript](https://www.typescriptlang.org/)

- `Todo`, 필터 타입 등 **도메인 모델**이 작을수록 타입이 곧 문서 역할을 합니다.

### [Tailwind CSS](https://tailwindcss.com/) 4

- 필터·카드·입력창 등 **반복 UI**를 적은 코드로 맞추고, 미니멀한 톤을 유지하기 쉽습니다.

### localStorage + `useSyncExternalStore`

- React 18+에서 권장되는 **외부 저장소 구독** 방식으로, SSR과 hydration 이슈를 **공식 패턴**으로 다룹니다.

**한 줄 요약:** Next·TS·Tailwind로 **얇은 풀스택 뼈대**를 쓰되, 데이터는 **브라우저 로컬 + 동기화 가능한 훅**에 모은 구성입니다.

## 기술 스택 (요약)

- [Next.js](https://nextjs.org) 16 (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) 4

## 주요 기능

- 할 일 추가 / 완료 토글 / 삭제
- 필터링 (전체 / 완료 / 미완료)
- localStorage를 통한 데이터 영속화
- 모바일 반응형 UI

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
