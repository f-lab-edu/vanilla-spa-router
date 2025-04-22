# vanilla-spa-router

- 요구사항

  - 홈화면 -> 상품화면으로 이동 ( /product)
  - /product 화면에서 API호출을 통해 상품리스트를 렌더링
    - 이미지, 상품 이름이 들어간 카드형태 리스트
  - Typescript로 작성하기

- 세부 구현 사항

  - Router 구현

    - Router 클래스 구현
    - Route 핸들링 로직 구현

  - 페이지 컴포넌트 구현

    - Home 컴포넌트
    - ProductList 컴포넌트

  - API 구현

    - MSW 설정
    - 상품 API mocking
    - API 호출 함수 구현

  - 테스트 코드 작성

    - Router 테스트
    - API 호출 테스트
