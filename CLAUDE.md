# 유정노동법률사무소 홈페이지 (www.yujung-labor.com)

## 구조
- 정적 HTML 사이트. GitHub Pages(main 브랜치, / root)로 게시. 커스텀 도메인 www.yujung-labor.com (CNAME 파일)
- 도메인: 가비아. DNS = A @ 185.199.108~111.153, CNAME www → creator0327.github.io.
- 2026-11-20 젠스파크(Genspark)에서 이전 완료. 젠스파크는 더 이상 사용하지 않음.

## 상담신청
- consult.html 폼 → js/main.js 의 CONSULT_ENDPOINT (Google Apps Script 웹앱)로 POST
- 접수 내용은 구글 시트 "유정 상담신청"의 "상담신청" 탭에 저장, creator0327@gmail.com 으로 알림 메일
- 옛 admin.html(젠스파크 DB용, 비밀번호가 코드에 노출)은 삭제함. 관리자 페이지는 구글 시트로 대체

## 자주 하는 수정
- 사무소 연혁: about.html `.timeline-full` 안의 `.tl-item` (최신 연도가 맨 위)
- 구성원 경력: members.html `#yoo-career`, `#shin-career` 의 `.career-item` (최신 순)
- 지도: location.html 은 구글 지도 임베드 (네이버 지도는 iframe 삽입 차단)
- 수정 후 main에 push 하면 1~2분 내 반영

## 진행 예정 작업
- 메인(index.html) 히어로 바로 아래 "공식 위촉 · 인증 현황" 섹션 신설
  - 회전 카드(3D 커버플로우) 방식: 가운데 카드 크게, 3초마다 다음으로, 마우스 올리면 멈춤, 클릭 시 확대
  - 상단 탭: 전체 / 유상건 대표노무사 / 신혜경 노무사, "공식 위촉·수상 40+건" 강조 문구
  - 사이트 톤(남색+금색)에 맞출 것. 증명서 이미지의 개인정보(주민번호·주소)는 가림 처리
  - 자료(두 분 각 약 20장)는 사용자가 제공 예정
