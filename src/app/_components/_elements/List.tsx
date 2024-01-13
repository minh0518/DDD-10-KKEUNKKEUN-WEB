import { ListInfoType } from '@/types/common';

const List = ({ listArr }: { listArr: ListInfoType }) => {
  return (
    <>
      {listArr.map((item, index) => {
        return (
          <li key={index} className={item._className}>
            {item.content}
          </li>
        );
      })}
    </>
  );
};

export default List;
