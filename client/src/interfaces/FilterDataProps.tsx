export default interface FilterDataProps {
  filterTag: string;
  filterStatus: string;
  setFilterTag: React.Dispatch<React.SetStateAction<string>>;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
}
