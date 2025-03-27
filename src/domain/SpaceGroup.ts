export interface SpaceGroup {
  id?: string
  day: Date;
  plant: number;
  type: string;
  spaces: number;
  usedSpaces: number
}

export interface SpaceGroupFilter {
  id?: string[];
  plant?: number[];
  type?: string[];
  day?: Date[];
  fromDate?: Date,
  toDate?: Date,
}