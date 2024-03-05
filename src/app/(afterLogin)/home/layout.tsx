export default async function HomeLayout({ children }) {
  return (
    <div>
      홈 레이아웃
      {children}
    </div>
  );
}

// RootLayout -> HomeLayout -> Home 계층구조가 됩니다.
