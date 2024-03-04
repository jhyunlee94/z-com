import { ReactNode } from "react";
import style from "@/app/(afterLogin)/layout.module.css";
import Link from "next/link";
import Image from "next/image";
import zLogo from "../../../public/zlogo.png";
import NavMenu from "./_component/NavMenu";
import LogOutButton from "./_component/LogoutButton";
import TrendSection from "./_component/TrendSection";
import FollowRecommend from "./_component/FollowRecommend";
import RightSearchZone from "./_component/RightSearchZone";

type Props = { children: ReactNode; modal: ReactNode };

export default function AfterLoginLayout({ children, modal }: Props) {
  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href="/home">
              <div className={style.logoPill}>
                <Image src={zLogo} alt="z.com로고" width={40} height={40} />
              </div>
            </Link>
            <nav>
              <ul>
                <NavMenu />
              </ul>
              <Link href="/compose/tweet" className={style.postButton}>
                게시하기
              </Link>
            </nav>
            <LogOutButton />
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          <main className={style.main}>{children}</main>
          <section className={style.rightSection}>
            <RightSearchZone />
            <TrendSection />
            {/* <FollowRecommend /> */}
            <div className={style.followRecommend}>
              <h3 style={{ color: "black" }}>팔로우 추천</h3>
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {/* 애프터 로그인 레이아웃 */}
      {/* {children} */}
      {/* 모달은 컨테이너 안에는 들어가있지만 타입스크립트 부분 체크하면됨 */}
      {modal}
    </div>
  );
}
