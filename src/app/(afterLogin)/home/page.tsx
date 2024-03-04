import Image from "next/image";
import style from "./home.module.css";
import Tap from "./_component/Tap";
import TabProvider from "./_component/TabProvider";
import PostForm from "./_component/PostForm";
export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tap />
        {/* Form 은 대부분 client 라고 생각하면 됨 */}
        <PostForm />
      </TabProvider>
    </main>
  );
}
