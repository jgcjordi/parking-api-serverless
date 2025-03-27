export interface SpaceGroup {
  id?: string
  day: Date;
  floor: number;
  type: string;
  spaces: number;
  usedSpaces: number
}

export interface SpaceGroupFilter {
  id?: string[];
  floor?: number[];
  type?: string[];
  day?: Date[];
  fromDate?: Date,
  toDate?: Date,
}