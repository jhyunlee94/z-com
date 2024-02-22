import { ReactNode } from "react";
import style from "./page.module.css";
type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function Layout({ children, modal }: Props) {
  return (
    <div className={style.container}>
      {/* 비포 로그인 레이아웃 */}
      {/* i / login 은 layout 기준으로 children 이고 */}
      {/* @modal 에 있는건 modal 에서 됩니다. */}
      {children}
      {modal}
    </div>
  );
}

// 주소가 localhost:3000 일 때는 children -> page.tsx, modal -> @modal/default.tsx
// 주소가 localhost:3000/i/flow/login 일 때는 children -> i/flow/login/page.tsx, modal -> @modal/i/flow/login/page.tsx
