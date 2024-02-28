import { ReactChildrenProps } from '@/types/common';
import PracticeNav from './_components/PracticeNav';

const Layout = ({ children }: ReactChildrenProps) => {
  return (
    <div>
      <PracticeNav />
      {children}
    </div>
  );
};

export default Layout;
