import { ListProp } from '@/types/element';

const List = ({ listArr }: { listArr: ListProp }) => {
  return (
    <>
      {listArr.map((item, index) => {
        return (
          <li key={index} className={item._className} {...item}>
            {item._content}
          </li>
        );
      })}
    </>
  );
};

export default List;
