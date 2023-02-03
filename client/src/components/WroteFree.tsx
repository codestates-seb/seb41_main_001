import FreeDataProps from '../interfaces/FreeDataProps';
import MyFreeItem from './MyFreeItem';

const WroteFree = ({ data }: any) => (
  <div>
    {
      data.length === 0 ? (
        <div>글이 아직 없습니다</div>
      ) : (
        data.map((e: FreeDataProps) => (
          <MyFreeItem
            key={e.freeId}
            title={e.freeTitle}
            quota=""
            tags={e.freeTags}
            // dueDate={e.createdAt}
            id={e.freeId}
          />
        ))
      )
      // free가 생기면 여기도 위 recruits랑 똑같이 삼항 넣어주자
    }
  </div>
);
export default WroteFree;
