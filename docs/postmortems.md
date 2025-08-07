# Postmortem Report

## 2025년 8월 6일

### 이슈 1: Next.js 프로젝트 생성 실패

**문제 (Problem):**
`create-next-app` 명령어가 대화형 프롬프트에서 멈춰 프로젝트 생성을 완료하지 못했습니다. 이로 인해 `package.json` 등 필수 파일이 누락되는 문제가 발생했습니다.

**원인 (Root Cause):**
`create-next-app` 실행 시 "Would you like to use Turbopack for `next dev`?"와 같은 예기치 않은 대화형 질문이 발생했습니다. 자동화된 실행 환경에서는 이에 응답할 수 없어 프로세스가 중간에 멈췄습니다. `--yes` 플래그를 사용한 시도 역시 이 특정 프롬프트를 해결하지 못했습니다.

**해결책 (Solution):**
모든 구성 옵션을 명시적으로 CLI 플래그로 전달하여 대화형 프롬프트가 나타날 여지를 원천적으로 차단했습니다. 특히 `--no-turbopack` 플래그를 추가하여 관련 질문을 비활성화한 것이 핵심이었습니다.

**최종 성공 명령어:**
```bash
npx create-next-app@latest toma --ts --tailwind --eslint --app --no-src-dir --import-alias="@/*" --use-npm --no-turbopack
```

---

### 이슈 2: `shadcn/ui` 초기화 실패

**문제 (Problem):**
`npx shadcn@latest init` 명령어가 여러 차례 실패했습니다. 주된 원인은 파일 미존재, 파일 이미 존재, 그리고 또 다른 대화형 프롬프트였습니다.

**원인 (Root Cause):**
1.  **`components.json` 충돌:** `init` 명령을 실행하기 전에 `components.json` 파일을 미리 생성했습니다. 하지만 `init` 명령어는 이 파일을 *생성*하는 역할이므로, 파일이 이미 존재하면 오류를 발생시키고 중단되었습니다.
2.  **대화형 프롬프트:** `--yes` 플래그를 사용했음에도 불구하고, `init` 명령어는 "base color"를 묻는 대화형 프롬프트에서 멈췄습니다.
3.  **잘못된 CLI 플래그:** `--tailwind.config=...` 와 같은 플래그로 비대화형 설정을 시도했으나, `shadcn/ui` CLI는 이를 유효한 옵션으로 인식하지 않았습니다.

**해결책 (Solution):**
문제가 많았던 `init` 명령을 사용하는 대신, 다른 접근법을 사용했습니다. `shadcn/ui`의 `add` 명령어는 프로젝트가 초기화되지 않았을 경우, 필요한 설정(tailwind.config.ts 수정, 유틸리티 파일 생성 등)을 자동으로 수행하는 기능이 있습니다.

1.  먼저, `shadcn/ui`가 읽을 수 있도록 원하는 설정이 담긴 `components.json` 파일을 생성했습니다.
2.  그 다음, `init` 대신 `add` 명령어를 실행하여 첫 컴포넌트(`button`)를 추가했습니다. 이 과정에서 `shadcn/ui`가 성공적으로 초기화되었습니다.

**최종 성공 절차:**
```bash
# 1. (필요시) tailwind.config.ts 파일 생성
# 2. 원하는 설정으로 components.json 파일 생성
# 3. init 대신 add 명령어 실행
cd /home/moonlygreat/toma && npx shadcn@latest add button --yes
```

---

## 2025년 8월 7일

### 이슈 3: Primary Color Application Issue in Tailwind CSS v4

**문제 (Problem):**
Primary Button과 TaskCard의 테두리에 `tomato-red` 색상이 적용되지 않았습니다. 초기에는 `tailwind.config.ts`의 `safelist` 및 `theme.colors` 설정을 통해 해결을 시도했으나 실패했습니다. 또한, `autoprefixer` 종속성 누락으로 인해 서버 시작 문제가 발생했습니다.

**원인 (Root Cause):**
1.  **Tailwind CSS v4 설정 변경:** Tailwind CSS v4에서는 커스텀 색상 정의 및 `safelist` 설정 방식이 변경되었습니다. 이전 버전에서 사용되던 `tailwind.config.ts` 파일의 `colors` 및 `safelist` 옵션은 더 이상 유효하지 않으며, 이러한 설정은 이제 메인 CSS 파일(`app/globals.css`) 내의 `@theme` 및 `@source` 지시문을 통해 이루어져야 합니다.
2.  **`autoprefixer` 종속성 누락:** `postcss.config.mjs`에 `autoprefixer` 플러그가 추가되었으나, 해당 패키지가 설치되지 않아 서버 시작 시 오류가 발생했습니다.

**해결책 (Solution):**
1.  **`autoprefixer` 설치:** `npm install autoprefixer` 명령어를 사용하여 `autoprefixer` 패키지를 설치했습니다.
2.  **Tailwind CSS v4 설정 적용:**
    *   `tailwind.config.ts` 파일을 원래 상태로 되돌렸습니다.
    *   `app/globals.css` 파일에 `@theme` 지시문을 사용하여 `tomato-red`, `basil-green` 등 모든 커스텀 색상을 CSS 변수로 정의했습니다.
    *   `app/globals.css` 파일에 `@source inline(...)` 지시문을 사용하여 `bg-tomato-red`, `text-cream-white`, `border-tomato-red`와 같이 동적으로 생성되는 Tailwind 클래스를 명시적으로 safelist에 추가했습니다.
    *   `components/ui/button.tsx` 및 `components/ui/task-card.tsx` 파일에서 커스텀 CSS 클래스(`btn-primary-custom`, `border-tomato-red-custom`) 사용을 제거하고, Tailwind의 명명된 클래스(`bg-tomato-red`, `text-cream-white`, `border-tomato-red`)를 다시 사용하도록 변경했습니다.

**교훈 (Lessons Learned):**
1.  **프레임워크 주요 버전 변경 사항 숙지:** Tailwind CSS v4와 같이 주요 버전이 변경될 경우, 설정 방식에 큰 변화가 있을 수 있으므로 공식 문서를 통해 최신 설정 방법을 반드시 확인해야 합니다.
2.  **종속성 관리의 중요성:** 새로운 패키지를 설정 파일에 추가할 경우, 해당 패키지가 프로젝트에 올바르게 설치되었는지 즉시 확인해야 합니다.
3.  **정확한 진단 및 디버깅:** 문제 발생 시, 증상만을 보고 섣불리 판단하기보다는, 다양한 진단 방법을 통해 근본적인 원인을 파악하는 것이 중요합니다. 이번 경우, `safelist`가 작동하지 않는다는 초기 진단이 Tailwind v4의 설정 변경 때문임을 뒤늦게 파악했습니다.