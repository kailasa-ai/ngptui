import Sidebar from "../_sidebar";

const HomePageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-full flex w-full overflow-hidden relative">
      <Sidebar />
      {children}
    </div>
  );
};

export default HomePageLayout;
