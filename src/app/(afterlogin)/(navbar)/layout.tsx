import Navbar from '@/app/(afterlogin)/_components/Navbar';
import { ReactChildrenProps } from '@/types/common';

const Layout = ({ children }: ReactChildrenProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
