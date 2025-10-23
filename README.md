# 🍅 Toma

Toma는 서로의 태스크 완료를 확인해주고 포모도로 테크닉을 중심으로 협업을 독려하는 생산성 커뮤니티 플랫폼입니다. 농장을 경영하며 토마토를 재배하는 메타포를 사용해 작업의 진행 상황을 시각적으로 표현하고, 커뮤니티가 서로를 응원하며 성장을 돕습니다. [PRD](./docs/prd.md)와 [디자인 시스템](./docs/toma-design-system.md)에 기반해 웹 애플리케이션으로 구현되고 있습니다.

## 주요 기능

- **태스크 재배와 수확**: `TaskCard` 컴포넌트를 통해 태스크의 상태(심음, 재배 중, 수확 대기, 수확 완료)를 직관적으로 파악할 수 있습니다.
- **포모도로 타이머**: 포모도로 집중/휴식 주기를 따라 작업을 기록하며, 각 세션은 농부가 수확하는 토마토 수량에 반영됩니다. `PomodoroTimer` 컴포넌트에서 타이머의 상태를 전환할 수 있습니다.
- **커뮤니티 피드**: `FeedItem`을 통해 다른 농부들의 활동과 응원, 수확 소식을 확인하며 상호 작용할 수 있습니다.
- **기여도 히트맵**: `ContributionHeatmap`으로 일자별 수확량을 시각화하여 장기적인 성과를 추적합니다.
- **Supabase 인증**: 이메일 기반 회원가입/로그인을 제공하며, `app/auth/page.tsx`와 `lib/supabase.ts`가 Supabase Auth API를 사용해 세션을 관리합니다.

## 기술 스택

- [Next.js 15](https://nextjs.org/) & [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) 기반 커스텀 디자인 시스템
- [Supabase](https://supabase.com/) (Auth 및 서버 사이드 연동)

## 프로젝트 구조 하이라이트

- `app/`: 라우팅과 페이지 컴포넌트 (`app/page.tsx`, `app/auth/page.tsx` 등)
- `components/`: 버튼, 토글, 타이머 등 UI 컴포넌트와 디자인 시스템 요소
- `lib/`: Supabase 클라이언트 래퍼 등 유틸리티 코드
- `docs/`: 제품 기획(PRD), 데이터베이스 설계, 디자인 시스템 문서

## 시작하기

개발 서버를 실행하려면 다음 명령을 사용하세요. 기본 포트는 `8080`입니다.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

브라우저에서 [http://localhost:8080](http://localhost:8080)을 열면 애플리케이션을 확인할 수 있습니다. 페이지는 `app/page.tsx`를 수정하면 자동으로 갱신됩니다.

### 환경 변수

Supabase와 연동하려면 아래 환경 변수를 `.env.local` 등에 설정해야 합니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 배포

Next.js에서 제공하는 [배포 가이드](https://nextjs.org/docs/app/building-your-application/deploying)에 따라 Vercel 등의 플랫폼으로 배포할 수 있습니다.
