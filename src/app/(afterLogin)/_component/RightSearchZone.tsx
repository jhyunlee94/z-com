"use client";

import style from "@/app/(afterLogin)/_component/rightSearchZone.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import SearchForm from "./SearchForm";

export default function RightSearchZone() {
  const pathname = usePathname();
  // 라디오 버튼 역할을 하는 라디오 버튼 위에다가 div 를 올려놓은거
  // 클릭했을때는 게시하기 모달에서 사진svg(버튼) 눌렀을때 인풋 눌러지게 하는거니까
  // 이거는 버튼인데 버튼 클릭될때 인풋되게하니까
  // 그런식으로 가짜 디브를 만든 다음에 이 디브를 클릭했을 때 라디오 버튼이 클릭되게
  // 그렇게 ref 로 연결 해놓으면 됩니다.
  const radioRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const onChangeFollow = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("pf", "on");
    router.replace(`/search?${newSearchParams.toString()}`);
    // let url = `/search?q=${searchParams.get("q")}&pf=on`;
    // if (searchParams.has("f")) {
    //   url += `&f=${searchParams.get("f")}`;
    // }
    // router.replace(url);
  };
  const onChangeAll = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("pf");
    router.replace(`/search?${newSearchParams.toString()}`);
    // let url = `/search?q=${searchParams.get("q")}`;
    // if (searchParams.has("f")) {
    //   url += `&f=${searchParams.get("f")}`;
    // }
    // router.replace(url);
  };

  if (pathname === "/explore") return null;

  if (pathname === "/search") {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label style={{ color: "black" }}>사용자</label>
            <div className={style.radio}>
              <div style={{ color: "black" }}>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={onChangeAll}
              />
            </div>
            <div className={style.radio}>
              <div style={{ color: "black" }}>내가 팔로우하는 사람들</div>
              <input
                type="radio"
                name="pf"
                value="on"
                onChange={onChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
}
