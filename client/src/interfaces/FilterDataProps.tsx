export default interface FilterDataProps {
  filterTag: string;
  filterStatus: string; // '모집중' | '모집완료' | '활동종료';
  setFilterTag: React.Dispatch<React.SetStateAction<string>>;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
}
