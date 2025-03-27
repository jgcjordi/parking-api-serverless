import { SpaceGroup, SpaceGroupFilter } from "../SpaceGroup";

export interface SpaceGroupProvider {
    create(spaces: SpaceGroup[]): Promise<SpaceGroup[]>;
    update(spaces: SpaceGroup): Promise<SpaceGroup>;
    delete(id: string): Promise<void>;
    deleteAllBetweenDates(from: Date, to: Date): Promise<void>;
    findAll(filters: SpaceGroupFilter): Promise<SpaceGroup[]>;
}