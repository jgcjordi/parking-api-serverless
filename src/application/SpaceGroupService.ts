import { DataSource } from "typeorm";
import { SpaceGroup, SpaceGroupFilter } from "../domain/SpaceGroup";
import { SpaceGroupProvider } from "../domain/provider/SpaceGroupProvider";
import { SpaceGroupReplicateDTO } from "./dto/SpaceGroupReplicateDTO";

export class SpaceGroupService {
  constructor(private spaceProvider: SpaceGroupProvider, private dataSource: DataSource) { }

  async create(spaces: SpaceGroup[]): Promise<SpaceGroup[]> {
    return await this.spaceProvider.create(spaces);
  }

  async update(space: SpaceGroup): Promise<SpaceGroup> {
    return await this.spaceProvider.update(space);
  }

  async delete(id: string) {
    return await this.spaceProvider.delete(id);
  }

  async findAll(filters: SpaceGroupFilter): Promise<SpaceGroup[]> {
    return await this.spaceProvider.findAll(filters);
  }

  async replicate(replicate: SpaceGroupReplicateDTO): Promise<SpaceGroup[]> {
    return this.dataSource.transaction(async (manager) => {
      const { dateToReplicate, dateFrom, dateTo } = replicate;

      const filters: SpaceGroupFilter = {
        day: [dateToReplicate]
      };

      const spacesToReplicate = await this.spaceProvider.findAll(filters);

      await this.spaceProvider.deleteAllBetweenDates(dateFrom, dateTo);

      const newSpaces: SpaceGroup[] = [];
      const currentDate = new Date(dateFrom);
      const toDate = new Date(dateTo);

      while (currentDate <= toDate) {
        for (const space of spacesToReplicate) {
          const newSpace = { ...space, day: new Date(currentDate), id: undefined, usedSpaces: 0 } as SpaceGroup;
          newSpaces.push(newSpace);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return this.spaceProvider.create(newSpaces);
    });
  }
}