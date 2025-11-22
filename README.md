# React + Gemini AI 저녁 메뉴 추천기 (Dinner Roulette)

![Project Screenshot](https://via.placeholder.com/1200x630/2563eb/ffffff?text=Dinner+Roulette+App)

<p align="center">
<a href="https://your-project-url.vercel.app/">
<img src="https://img.shields.io/badge/Visit_App-Open_Demo-blue?style=for-the-badge&logo=vercel" />
</a>
</p>

> React · TypeScript · Tailwind CSS · Google Gemini API를 활용해
> 결정 장애를 해결해주는 AI 기반 저녁 메뉴 추천 서비스입니다.

## 주요 기능

- **AI 기반 메뉴 추천** - Google Gemini 2.5 Flash 모델을 활용하여 매번 새로운 메뉴를 추천합니다.
- **상세 음식 정보 제공** - 메뉴 이름, 한 줄 소개, 칼로리 정보, 그리고 맛과 식감을 표현하는 감각적인 태그(Badge)를 제공합니다.
- **반응형 UI 디자인** - Tailwind CSS를 사용하여 모바일과 PC 환경 모두에서 최적화된 중앙 정렬 카드 UI를 구현했습니다.
- **스마트한 에러 핸들링** - API 사용량 초과(429 Error) 시 Exponential Backoff 알고리즘을 통해 자동으로 재시도하며, 사용자 친화적인 대기 메시지를 표시합니다.
- **인터랙티브 UI** - 부드러운 로딩 애니메이션, 스켈레톤 UI, 버튼 인터랙션을 통해 매끄러운 사용자 경험을 제공합니다.

## 🚀 빠른 시작

### 설치

```bash
# 저장소 복제
git clone https://github.com/your-username/dinner-roulette
cd dinner-roulette

# 의존성 설치
npm install
# or
yarn install
```

### 환경 변수 설정

Google AI Studio에서 발급받은 API 키가 필요합니다.

```bash
# 실행 환경(예: Vercel)의 환경 변수에 설정하거나
# 로컬 실행 시 process.env.API_KEY를 설정해야 합니다.
export API_KEY=your_google_gemini_api_key_here
```

### 개발 서버 실행

```bash
npm start
# or
yarn start
```

## 🛠 기술 스택

- **React 19** – 컴포넌트 기반 UI 구성
- **TypeScript** – 정적 타입 안정성 확보
- **Tailwind CSS** – 유틸리티 퍼스트 스타일링 및 애니메이션
- **Google GenAI SDK** – Gemini 2.5 Flash 모델 연동
- **Vercel** – 배포 환경

## 📁 프로젝트 폴더 구조

```
root/
├── components/           # UI 컴포넌트
│   ├── MenuCard.tsx      # 메뉴 정보 카드 (태그, 설명, 칼로리 등)
│   └── SpinButton.tsx    # 추천 시작/재시도 버튼 (로딩 상태 포함)
├── services/
│   └── geminiService.ts  # Google Gemini API 프롬프트 엔지니어링 및 에러 핸들링
├── App.tsx               # 메인 애플리케이션 로직 및 레이아웃
├── index.tsx             # 앱 진입점
├── index.html            # HTML 템플릿 (Tailwind CDN 포함)
├── types.ts              # 타입 정의 (DinnerRecommendation, LoadingState 등)
└── metadata.json         # 프로젝트 메타데이터
```
