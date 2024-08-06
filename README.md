# react-deploy

## 4단계

- 질문 1. SPA 페이지를 정적 배포를 하려고 할 때 Vercel을 사용하지 않고 한다면 어떻게 할 수 있을까요?
  - AWS를 이용해서 정적 배포를 할 수 있습니다. 단계는 다음과 같습니다.
    1. 스토리지: 정적 파일을 저장(캐싱된 파일이 없다면 여기서 파일을 불러옴)
    2. CDN(Content Delivery Network): 분산 서버(캐싱에 사용)
    3. Route: 사용자 요청을 처리
- 질문 2. CSRF나 XSS 공격을 막는 방법은 무엇일까요?
  - dmf.ui
- 질문 3. 브라우저 렌더링 원리에대해 설명해주세요.
  - CRP(Critical Rendering Path): 웹페이지 빌드 과정(브라우저가 HTML 응답을 받고 화면에 표시하기 전의 과정)
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/95a3971e-b9cb-4f8d-b6bd-59d8c4f8cbc8/ac910536-467c-4135-94fe-70ce519d9861/Untitled.png)
    1. HTML 문서를 읽음(DOM tree 생성)
    2. 스타일을 입힘(DOM과 CSSOM를 결합해 Render tree 생성)
    3. 뷰포트에 표시
       - layout: 브라우저가 요소의 크기와 위치 계산
       - paint: 실제 화면에 그림
  - 인터렉션에 의해 DOM이 변할 때 마다 Render Tree가 재생성된다 → 인터렉션이 많은 React 앱 등의 경우 치명적!
  - React의 해결점: 가상 돔
    1. 데이터가 바뀌면 가상돔에 랜더링됨
    2. Diffing: 이전 가상 돔과 비교
    3. Reconciliation: 바뀐 부분만 실제 돔에 적용
    - 스트리밍 서비스의 버퍼와 유사한 이점 → 변화점이 30개 더라도 한번에 묶어서 반영할 수 있다.
    - 실제 리액트의 리렌더링 타이밍
      - state 변경
      - 부모 컴포넌트이 랜더링 됨
      - 새 props가 들어옴
      - shouldComponentUpdate에서 true가 반환됨
      - forceUpdate가 실행됨
