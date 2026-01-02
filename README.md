# 영화 정보 페이지

Next.js로 구축된 웹 애플리케이션으로, 사용자가 영화를 탐색하고, 세부 정보를 확인하며, 다양한 기준으로 검색하고 필터링할 수 있습니다. 이 프로젝트는 TMDb API를 활용하여 풍부한 영화 탐색 경험을 제공합니다.

## 기술 스택

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI:** shadcn/ui (Radix UI 기반)
- **Animation:** Motion
- **Slider:** Swiper.js
- **Movie API:** The Movie Database (TMDb) API

## 시작하기

1.  저장소를 클론

```bash
git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer
```

2.  의존성 설치

```bash
npm install
# 또는
yarn install
```

3.  환경 변수 설정

```
# .env.local 파일 생성
NEXT_PUBLIC_TMDB_API_KEY=YOUR_TMDB_API_KEY
```

4.  개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

### 개발 서버 실행

개발 모드에서 애플리케이션을 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인.
