# Looma 개발 로드맵

IT 기획자·디자이너가 이미지 위에 포인트 핀 주석을 달아 시각적 지식 자산을 축적하는 앱, Looma의 단계별 개발 계획서

## 개요

Looma는 Next.js 15 (App Router) + Supabase + TailwindCSS v4 스택 기반으로 구축됩니다.
현재 프로젝트는 Supabase 스타터 키트 기반으로 인증 흐름(이메일 로그인)이 구현되어 있으며,
이 로드맵은 Looma 전용 기능을 단계적으로 추가하는 방향으로 설계되었습니다.

**핵심 기능:**

- **이미지 주석 시스템**: 이미지 위 임의 지점 탭 → 포인트 핀 생성 → 문제점·해결과정 텍스트 입력
- **시각적 지식 라이브러리**: 2열 카드 그리드로 기록 조회, 키워드 검색 및 태그 필터
- **기록 상세 조회**: 포인트 핀 탭 시 바텀시트로 주석 내용 확인
- **기본 인증**: 이메일 회원가입/로그인/로그아웃

**개발 원칙**: UI-First 방식 적용

1. 골격(라우트 + 타입) 먼저 구축
2. UI/UX를 더미 데이터로 빠르게 완성 → 보완점 파악
3. DB 스키마 및 Supabase 설정 (UI 검증 후 확정)
4. 실제 Supabase 연동으로 교체
5. 성능 최적화 및 QA

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 Playwright MCP 테스트 시나리오 작성**
   - 새 작업의 경우, 문서에는 빈 박스와 변경 사항 요약이 없어야 함

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 테스트 통과 확인 후 다음 단계로 진행

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 ✅로 표시

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축

> 목표: Looma 전용 라우트 구조와 TypeScript 타입을 확정한다. DB 스키마는 UI 검증 후 Phase 3에서 진행한다.

---

- **Task 001: Looma 전용 라우트 구조 생성 - 앱 네비게이션 골격 확립** - 우선순위
  - `app/(auth)/layout.tsx`: 비로그인 전용 레이아웃 (로그인/회원가입 래퍼, Looma 브랜딩 적용)
  - `app/(app)/layout.tsx`: 로그인 필수 레이아웃 (하단 탭바 포함, 미들웨어 보호)
  - `app/(app)/home/page.tsx`: 홈 페이지 (기록 유형 선택)
  - `app/(app)/record/layout.tsx`: 3단계 기록 생성 공통 레이아웃 (Context Provider 포함)
  - `app/(app)/record/image/page.tsx`: 이미지 선택 페이지 (Step 1/3)
  - `app/(app)/record/annotate/page.tsx`: 주석 작성 페이지 (Step 2/3)
  - `app/(app)/record/info/page.tsx`: 정보 입력 페이지 (Step 3/3)
  - `app/(app)/library/page.tsx`: 라이브러리 페이지
  - `app/(app)/library/[recordId]/page.tsx`: 기록 상세 페이지
  - `middleware.ts`: `/home`, `/record/*`, `/library/*` 경로에 대한 Supabase 세션 보호

---

- **Task 002: 핵심 TypeScript 타입 정의 - 타입 안전성 기반 마련** - 우선순위
  - `types/record.ts`: `Record`, `RecordInsert`, `RecordUpdate` 타입 정의 (image_url nullable 포함)
  - `types/annotation.ts`: `Annotation`, `AnnotationInsert`, `AnnotationDraft` 타입 정의 (x_ratio, y_ratio float 포함)
  - `types/tag.ts`: `Tag`, `TagInsert`, `RecordTag` 타입 정의
  - `types/index.ts`: 모든 타입 재수출 배럴 파일
  - `RecordDraft` 인터페이스: `imageFile: File | null`, `imagePreviewUrl: string | null`, `annotations: AnnotationDraft[]`, `title: string`, `description: string`, `tagIds: string[]`
  - `store/recordDraftContext.tsx`: 3단계 마법사 전역 상태 Context (RecordDraft 상태 + 업데이트 함수)

---

### Phase 2: UI/UX 완성 (더미 데이터 활용)

> 목표: 실제 데이터 연동 없이 더미 데이터로 모든 페이지의 UI/UX를 완성한다. 이 단계 완료 후 화면을 검토하여 DB 스키마 확정에 반영한다.

---

- **Task 003: 공통 레이아웃 및 네비게이션 UI 구현 - 앱 전체 일관성 확보** - 우선순위
  - `components/layout/BottomTabBar.tsx`: 하단 탭바 컴포넌트 (홈 아이콘 → `/home`, 책 아이콘 → `/library`, `usePathname`으로 활성 탭 강조)
  - `components/layout/StepHeader.tsx`: 3단계 진행 헤더 (뒤로가기 버튼, 페이지 제목, 우측 액션 버튼, 진행 점 3개 표시)
  - `app/(app)/layout.tsx`에 BottomTabBar 통합, `/record/*` 라우트에서는 탭바 숨김 처리
  - 전체 앱 모바일 우선 레이아웃: `max-w-md mx-auto` 컨테이너 적용
  - 인증 페이지 Looma 브랜딩 적용 (한국어 레이블, 로고 색상), 로그인 성공 시 `/home`으로 리디렉션

---

- **Task 004: 홈 페이지 UI 구현 - 기록 유형 선택 화면 완성**
  - `app/(app)/home/page.tsx`: 오늘 날짜 표시 헤더, 이미지 기반 기록 카드, 텍스트 기반 기록 카드 배치
  - `components/home/RecordTypeCard.tsx`: 선택 옵션 카드 컴포넌트 (아이콘, 제목, 설명, 화살표 아이콘)
  - 이미지 기반 기록 카드 클릭 → `/record/image`로 이동
  - 텍스트 기반 기록 카드 클릭 → `/record/info?type=text`로 이동
  - 상단 설정 버튼 (아이콘만, 추후 기능 연결)

---

- **Task 005: 이미지 선택 페이지 UI 구현 (Step 1/3) - F001**
  - `app/(app)/record/image/page.tsx`: 전체 레이아웃, StepHeader (1단계 활성), 이미지 그리드 표시
  - `components/record/ImageGallery.tsx`: 기기 갤러리 이미지 그리드 (더미 이미지 12개 표시, `input[type=file]` 활용)
  - `components/record/ImagePreview.tsx`: 상단 선택된 이미지 미리보기 영역
  - `components/record/CameraButton.tsx`: 카메라 즉시 촬영 버튼 (카메라 아이콘, `capture="environment"` 속성)
  - 이미지 선택 시 미리보기 업데이트 및 "다음" 버튼 활성화
  - 더미 이미지 선택 후 `/record/annotate`로 이동 플로우 검증

---

- **Task 006: 주석 작성 페이지 UI 구현 (Step 2/3) - F002, F003** - 우선순위
  - `app/(app)/record/annotate/page.tsx`: 이미지 전체화면 표시, 포인트 핀 오버레이, 바텀시트 통합
  - `components/record/AnnotationCanvas.tsx`: 이미지 위 클릭 좌표를 비율(0~1)로 변환하여 핀 생성 (`xRatio = offsetX / offsetWidth`, `yRatio = offsetY / offsetHeight`)
  - `components/record/PointPin.tsx`: 포인트 핀 UI (`+` 아이콘, 번호 배지, 절대 위치 `left: xRatio*100%`, `top: yRatio*100%`, `position: absolute`)
  - `components/record/AnnotationBottomSheet.tsx`: 바텀시트 컴포넌트 (슬라이드업 애니메이션, 문제점/해결과정 텍스트영역 2개, 저장/삭제 버튼)
  - 핀 탭 시 해당 주석 내용 바텀시트에 표시, 신규 핀 생성 시 빈 바텀시트 열림
  - 더미 이미지 + 더미 주석 3개로 전체 UI 검증

---

- **Task 007: 정보 입력 페이지 UI 구현 (Step 3/3) - F004, F005**
  - `app/(app)/record/info/page.tsx`: 썸네일 + 폼 레이아웃, StepHeader (3단계 활성)
  - `components/record/RecordInfoForm.tsx`: React Hook Form + Zod 스키마 (제목 필수 1~100자, 설명 선택 최대 1000자)
  - `components/record/TagSelector.tsx`: 태그 검색바, 기존 태그 칩 목록 (더미 태그 5개), 신규 태그 입력 + 엔터로 추가
  - 이미지 기록 시 이미지+핀 썸네일 표시, 텍스트 기록 시 텍스트 입력 영역 표시 (타입에 따라 조건부 렌더링)
  - 저장 버튼 클릭 시 더미 성공 처리 후 `/home` 이동

---

- **Task 008: 라이브러리 페이지 UI 구현 - F006, F007**
  - `app/(app)/library/page.tsx`: 헤더, 검색바, 태그 필터 칩 바, 2열 카드 그리드
  - `components/library/RecordCard.tsx`: 기록 카드 컴포넌트 (이미지 썸네일, 제목, 태그 칩 1~2개, 날짜)
  - `components/library/SearchBar.tsx`: 검색 인풋 (돋보기 아이콘, X 버튼으로 초기화)
  - `components/library/TagFilterBar.tsx`: 수평 스크롤 태그 칩 바 (선택된 칩 강조 표시)
  - 더미 데이터: 기록 8개, 태그 6개로 2열 그리드 레이아웃 검증
  - 검색어/태그 필터 더미 데이터 내 클라이언트 사이드 필터링으로 구현

---

- **Task 009: 기록 상세 페이지 UI 구현 - F002, F003, F008**
  - `app/(app)/library/[recordId]/page.tsx`: 이미지 + 핀 오버레이, 바텀시트, 헤더 편집 버튼
  - `components/detail/DetailAnnotationCanvas.tsx`: 읽기 전용 이미지 + 모든 포인트 핀 표시
  - `components/detail/DetailBottomSheet.tsx`: 기록 제목, 날짜, 태그 칩, 주석 목록 (각 주석별 문제점/해결과정 섹션), 주석 삭제 아이콘
  - `components/detail/FloatingAnnotationMessage.tsx`: 핀 탭 시 핀 근처 플로팅 말풍선 (주석 번호, 간략 텍스트)
  - 핀 탭 시 해당 주석으로 바텀시트 스크롤 이동
  - 더미 recordId로 더미 데이터 렌더링 검증

---

### Phase 3: DB 스키마 및 Supabase 설정

> 목표: Phase 2 UI 검토 결과를 반영하여 DB 스키마를 확정하고 Supabase 환경을 구축한다. UI에서 필요한 데이터 구조가 명확해진 후 진행한다.

---

- **Task 010: Supabase DB 스키마 마이그레이션 작성 - 데이터 구조 확정** - 우선순위
  - `supabase/migrations/001_create_records.sql`: records 테이블 생성 (user_id FK, image_url nullable, title, description, created_at)
  - `supabase/migrations/002_create_annotations.sql`: annotations 테이블 생성 (record_id FK, x_ratio, y_ratio, problem text, solution text)
  - `supabase/migrations/003_create_tags.sql`: tags 테이블 생성 (user_id FK, name, unique per user 제약)
  - `supabase/migrations/004_create_record_tags.sql`: record_tags 조인 테이블 생성 (record_id + tag_id 복합 PK)
  - `supabase/migrations/005_rls_policies.sql`: Row Level Security 정책 (각 테이블 user_id 기반 CRUD 제한)
  - Supabase MCP `execute_sql`로 마이그레이션 적용 및 검증
  - `utils/database.types.ts` 재생성: `supabase gen types typescript` 명령으로 최신 스키마 반영
  - Supabase Storage 버킷 `record-images` 생성 및 RLS 정책 설정 (소유자만 업로드/조회)

---

### Phase 4: 핵심 기능 구현

> 목표: 더미 데이터를 Supabase 실제 데이터로 교체하고, 인증·이미지 업로드·주석 저장 등 비즈니스 로직을 완성한다.

---

- **Task 011: 인증 흐름 Looma 완전 통합 - F010** - 우선순위
  - `middleware.ts` 구현: `/home`, `/record/*`, `/library/*` 경로를 세션 보호 대상으로 지정, 미인증 시 `/auth/login`으로 리디렉션
  - 로그인 성공 리디렉션을 `/home`으로 변경 (`components/login-form.tsx`의 `router.push` 수정)
  - 회원가입 성공 시 profiles 테이블 자동 생성 트리거 확인
  - 로그아웃 버튼을 하단 탭바 또는 홈 헤더 설정 메뉴에 통합
  - **Playwright MCP 테스트**:
    - 비로그인 상태에서 `/home` 접근 시 `/auth/login`으로 리디렉션 확인
    - 이메일/비밀번호 로그인 후 `/home` 페이지 진입 확인
    - 로그아웃 후 세션 만료 및 리디렉션 확인

---

- **Task 012: Supabase Storage 이미지 업로드 구현 - F001**
  - `utils/storage.ts`: `uploadRecordImage(file: File, userId: string): Promise<string>` 함수 (버킷 경로: `{userId}/{timestamp}_{filename}`)
  - `utils/storage.ts`: `getPublicImageUrl(path: string): string` 함수
  - 클라이언트 사이드 이미지 리사이즈: Canvas API 활용, 최대 1920px, 품질 80%
  - 이미지 선택 페이지에서 파일 선택 시 RecordDraft Context에 File 객체 저장
  - **Playwright MCP 테스트**:
    - 이미지 파일 선택 시 미리보기 표시 확인
    - 업로드 플로우 시작부터 URL 반환까지 확인

---

- **Task 013: 주석 저장 및 조회 Supabase 연동 - F002, F003** - 우선순위
  - `utils/annotations.ts`: `createAnnotation`, `getAnnotationsByRecordId`, `updateAnnotation`, `deleteAnnotation` CRUD 함수
  - 주석 작성 페이지의 더미 상태를 RecordDraft Context로 교체, 실제 Annotation 타입 사용
  - 기록 상세 페이지에서 `getAnnotationsByRecordId(recordId)`로 실제 주석 로드
  - 주석 삭제 시 낙관적 업데이트 (UI 즉시 반영 후 Supabase 동기화)
  - **Playwright MCP 테스트**:
    - 이미지 클릭으로 포인트 핀 생성 → 바텀시트 열림 확인
    - 주석 텍스트 입력 후 저장 → 핀 유지 및 내용 조회 확인
    - 기존 핀 탭 → 해당 주석 내용 바텀시트 표시 확인

---

- **Task 014: 기록 전체 저장 플로우 완성 - F004, F005**
  - `utils/records.ts`: `createRecord`, `getRecordsByUserId`, `getRecordById`, `updateRecord`, `deleteRecord` CRUD 함수
  - 정보 입력 페이지 저장 버튼 클릭 시 전체 플로우 실행: 1) Storage 이미지 업로드 → 2) records 테이블 INSERT → 3) annotations 일괄 INSERT → 4) record_tags INSERT
  - 저장 성공 시 RecordDraft 상태 초기화 후 `/home`으로 이동
  - 저장 실패 시 에러 메시지 표시 및 페이지 유지, 부분 저장 롤백 처리
  - 텍스트 기록 경로 (`?type=text`): image_url null, annotations 빈 배열로 records만 저장
  - **Playwright MCP 테스트**:
    - Step 1 → Step 2 → Step 3 전체 이미지 기록 생성 플로우 완료 확인
    - 텍스트 기록 생성 (이미지 없음) 플로우 완료 확인
    - 저장 후 라이브러리에서 해당 기록 카드 표시 확인

---

- **Task 015: 태그 CRUD Supabase 연동 - F005, F007**
  - `utils/tags.ts`: `getMyTags`, `createTag`, `addTagToRecord`, `removeTagFromRecord`, `getTagsByRecordId` 함수
  - 정보 입력 페이지 TagSelector를 실제 Supabase tags 테이블과 연동
  - 신규 태그 입력 시 tags 테이블 INSERT 후 record_tags 연결
  - 기존 태그 칩 선택 시 record_tags에 연결만 추가
  - 라이브러리 페이지 태그 필터 칩 바를 실제 태그 목록으로 교체
  - **Playwright MCP 테스트**:
    - 신규 태그 입력 후 엔터 → 태그 칩으로 표시 확인
    - 기존 태그 선택 → 기록 저장 → 상세 페이지 태그 표시 확인

---

- **Task 016: 라이브러리 검색 및 필터 Supabase 연동 - F006, F007**
  - 라이브러리 페이지를 Server Component로 구현: 초기 기록 목록 서버 사이드 로드
  - 검색 쿼리: `supabase.from("records").select("*, record_tags(tag_id, tags(name))").ilike("title", "%keyword%")`
  - 태그 필터: `record_tags` 조인으로 해당 태그 기록만 조회
  - URL 파라미터(`?q=keyword&tag=tagId`)로 검색/필터 상태 관리 (서버 컴포넌트 `searchParams` 활용)
  - 검색바/태그 칩은 Client Component로 분리하여 URL 파라미터 업데이트
  - **Playwright MCP 테스트**:
    - 검색어 입력 후 관련 기록만 필터링 확인
    - 태그 칩 클릭 후 해당 태그 기록만 표시 확인
    - 검색 초기화(X 버튼) 후 전체 목록 복원 확인

---

- **Task 017: 핵심 기능 통합 테스트 - 전체 사용자 플로우 검증**
  - Playwright MCP를 사용한 전체 사용자 플로우 E2E 테스트
  - 회원가입 → 로그인 → 이미지 기록 생성 → 라이브러리 조회 → 상세 페이지 확인 플로우
  - 텍스트 기록 생성 → 태그 필터로 검색 플로우
  - 주석 편집/삭제 플로우
  - 에러 핸들링 및 엣지 케이스 (네트워크 오류, 빈 라이브러리, 주석 없는 기록) 테스트

---

### Phase 5: 고급 기능 및 최적화

> 목표: 앱의 완성도와 사용성을 높이는 추가 기능과 성능 최적화를 수행한다.

---

- **Task 018: 기록 편집 기능 구현 - F002, F003, F008**
  - 기록 상세 페이지 헤더 편집 버튼 활성화
  - 편집 모드: 주석 추가/수정/삭제 가능하도록 AnnotationCanvas 편집 모드 전환
  - 제목/태그/설명 인라인 편집 UI (편집 아이콘 클릭 시 인풋 필드로 전환)
  - 편집 완료 시 records + annotations + record_tags 일괄 업데이트
  - 기록 삭제 기능: 확인 다이얼로그 후 records 삭제 (CASCADE로 annotations, record_tags 자동 삭제)

---

- **Task 019: 모바일 UX 세부 개선**
  - 바텀시트 드래그 제스처 지원 (터치 이벤트로 핸들 드래그 시 바텀시트 높이 조절)
  - 포인트 핀 롱프레스 시 삭제 옵션 표시 (모바일 UX 개선)
  - `next/image` 컴포넌트로 이미지 최적화 (WebP 자동 변환, lazy loading)
  - 각 페이지에 `loading.tsx` 추가 (스켈레톤 UI 적용)
  - 각 페이지에 `error.tsx` 추가 (에러 바운더리, 재시도 버튼)
  - 토스트 알림 컴포넌트 추가 (저장 성공/실패, 네트워크 오류 안내)

---

- **Task 020: 성능 최적화 및 배포**
  - Lighthouse 점수 측정 및 90점 이상 목표 (Performance, Accessibility, Best Practices)
  - 라이브러리 페이지 Suspense + streaming으로 기록 목록 점진적 로드
  - 라이브러리 페이지 무한 스크롤 구현 (Supabase `.range()` 활용)
  - ARIA 레이블 추가 (포인트 핀, 바텀시트, 탭바 등 접근성 보완)
  - Vercel 배포 설정, 환경 변수 관리, CI/CD 파이프라인 구성

---

## 기술적 고려사항

### 포인트 핀 좌표 시스템

- 좌표는 픽셀이 아닌 비율(0~1)로 저장하여 다양한 화면 크기에서 정확한 위치 재현
- `xRatio = clickX / imageWidth`, `yRatio = clickY / imageHeight`
- 렌더링 시 `left: ${xRatio * 100}%`, `top: ${yRatio * 100}%`로 절대 위치 적용
- 이미지 컨테이너는 `position: relative`, 핀은 `position: absolute`로 설정

### 바텀시트 구현 전략

- shadcn/ui의 `Sheet` 컴포넌트를 기반으로 하단 슬라이드업 변형 적용
- 모바일 환경에서 터치 드래그로 높이 조절 가능하도록 커스텀 훅 구현
- 바텀시트 열림/닫힘 상태를 Context 또는 URL 파라미터로 관리

### 기록 생성 플로우 상태 관리

- 3단계(이미지 선택 → 주석 작성 → 정보 입력)에 걸친 데이터를 React Context로 관리
- `app/(app)/record/layout.tsx`에서 Context Provider 제공
- 페이지 새로고침 시 데이터 손실 방지를 위해 sessionStorage 백업 고려

### Supabase RLS 보안

- 모든 테이블에 `auth.uid() = user_id` 조건의 RLS 정책 필수 적용
- Storage 버킷도 사용자별 경로 분리 및 RLS 적용
