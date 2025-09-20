# Wedding Photo Album

이 프로젝트는 기존 Angular(버전 19.2.13) 기반으로 한 웨딩 사진 앨범 업로드 웹 애플리케이션을 UI를 좀 더 개선하고자 React(v19)로 재구성한 프로젝트입니다.

## 주요 기능

- **사진 업로드**: 1회 최대 20장, 150MB 이하 업로드 가능
- **사용자 인증**: CSRF 토큰을 이용한 인증 처리
  - 비정상적인 접근에 의해 서비스의 악용을 방지하기 위한 보안 조치
- **반응형 UI**: 간단한 모바일, 데스크탑 레이아웃만 대응

## 기술 스택

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=React&logoColor=61DAFB)  
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)  
![tailwindcss](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)  
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)

## 폴더 구조

```plaintext
나중에 작성 예정
```

## 설치 및 실행

> 이 프로젝트는 Nodejs 22.12.0 이상에서 호환가능합니다.

## 환경 변수

```plaintext
API_SERVER=백엔드 서버 주소
```

- 백엔드 레포지토리: https://github.com/hjpark625/wedding-photo-album-server

## 의존성 설치

```bash
pnpm install --frozen-lockfile
```

## 개발환경 실행

```bash
pnpm dev
```
