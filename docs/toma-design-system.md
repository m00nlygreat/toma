# 제목 없음

## 🎨 **1. 색상 시스템 (Color System)**

| Color Role | Name | Value | Usage |
| --- | --- | --- | --- |
| Primary | Tomato Red | `#EF5842` | 버튼, 강조 텍스트, 아이콘 등 주 액션 색상 |
| Secondary | Basil Green | `#69983F` | 포모도로 상태, 잔디 차트, 완료 상태 강조 |
| Background | Cream White | `#FFF7E9` | 전체 배경 |
| Background | Cream White | `#FAECCF` | 기타 Surface |
| Text | Soil Black | `#3D3024` | 기본 텍스트 |
| Subtext | Earth Gray | `#887C71` | 날짜, 설명 텍스트 |
| Accent | Carrot Orange | `#FFA726` | 피드의 이모티콘, 응원 표시 등 부가적 강조 |

---

## 🔤 **2. 타이포그래피 (Typography)**

| Style | Font | Size | Weight | Usage |
| --- | --- | --- | --- | --- |
| 헤드라인 | Pretendard Bold | 24px | 700 | 타이틀, 페이지 이름 |
| 서브헤드라인 | Pretendard SemiBold | 18px | 600 | 주요 섹션 타이틀 |
| 본문 | Pretendard Regular | 16px | 400 | 일반 설명, 태스크 내용 |
| 주석/부가텍스트 | Pretendard Light | 14px | 300 | 날짜, 작성자, 설명 |

---

## 🧱 **3. 컴포넌트 (Components)**

### 📌 버튼

- **PrimaryButton**: Tomato Red 배경, White 텍스트
- **SecondaryButton**: 투명 배경, Basil Green 테두리
- **CTAButton**: 큰 동그란 버튼 (FAB), '+' 혹은 토마토 아이콘 포함

### ✅ 토글 스위치

- 예: `긴 휴식 [ ]` → 체크박스로 구현
- 색상: 체크 시 Basil Green

### 🍅 태스크 카드

- 상태별 아이콘:
    - 심은 상태 → 씨앗 아이콘
    - 수행중 → 자라는 토마토
    - 수확대기 → 붉은 토마토
    - 수확완료 → 바구니 안 토마토

### 🕒 포모도로 타이머

- 타원형/둥근 모서리 UI
- 시각적 진행 바
- 상태: 집중/휴식/긴 휴식 색상 변화

### 📊 잔디 히트맵

- 토마토 수확량 기준 색상 점점 진해짐
- 툴팁: `2024.08.01 - 3개 수확`

### 📣 피드 항목

- 농부 아바타(모자 쓴 사람)
- “@박씨, 토마토 2개 수확 🍅🍅”
- 응원 버튼 / 댓글 버튼

---

## 📱 **4. 레이아웃 가이드**

| 섹션 | 구성 요소 |
| --- | --- |
| 홈 | 내 밭 현황 + 포모도로 타이머 + 피드 |
| 태스크 창고 | 등록된 토마토 리스트 (백로그) |
| 피드 | 타 농부들의 수확 활동 |
| 프로필 | 닉네임, 잔디차트, 임대한 밭 정보 등 |
- 각 섹션은 카드형 UI 또는 탭으로 이동 가능
- 모바일 우선 디자인 (1-column), 데스크탑은 2~3 column 레이아웃

---

## 🧩 **5. 아이콘셋**

- 재배: 🌱
- 수확: 🍅
- 응원: 👍 / 🌾
- 긴 휴식: 💤
- 피드 댓글: 💬
- 기여도: 🔥 (또는 열매 모양)