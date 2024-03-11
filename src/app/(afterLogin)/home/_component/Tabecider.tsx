"use client";

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import PostRecommends from "./PostRecommends";
import FollowRecommend from "../../_component/FollowRecommend";
import FollowingPosts from "./FollowingPosts";

export default function Tabecider() {
  const { tab } = useContext(TabContext);
  if (tab === "rec") {
    return <PostRecommends />;
  }
  return <FollowingPosts />;
}
