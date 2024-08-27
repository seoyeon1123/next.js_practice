// (tabs)/layout.tsx
import TabBar from '@/components/tab-bar';
import TopBar from '@/components/top-bar';

export default function TabsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      {children}
      {modal}
      <TabBar />
    </>
  );
}
