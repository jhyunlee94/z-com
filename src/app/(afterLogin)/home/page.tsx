import Image from "next/image";
import style from "./home.module.css";
import Tap from "./_component/Tap";
import TabProvider from "./_component/TabProvider";
export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tap />
      </TabProvider>
    </main>
  );
}
