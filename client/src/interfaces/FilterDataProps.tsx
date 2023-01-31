export default interface FilterDataProps {
  filterTag: string;
  filterStatus: string;
  distanceLimit: number;
  setFilterTag: React.Dispatch<React.SetStateAction<string>>;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  setDistanceLimit: React.Dispatch<React.SetStateAction<number>>;
}
