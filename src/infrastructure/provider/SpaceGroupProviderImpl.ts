import { Between, In, Repository } from "typeorm";
import { SpaceGroup, SpaceGroupFilter } from "../../domain/SpaceGroup";
import { SpaceGroupProvider } from "../../domain/provider/SpaceGroupProvider";
import { SpaceGroupEntity } from "../entity/SpaceGroupEntity";
import { DataSource } from "typeorm";
import { SpaceGroupMapper } from "../mapper/SpaceGroupMapper";

export class SpaceGroupProviderImpl implements SpaceGroupProvider {
    private spaceGroupRepository: Repository<SpaceGroupEntity>;

    constructor(private dataSource: DataSource) {
        this.spaceGroupRepository = this.dataSource.getRepository(SpaceGroupEntity);
    }

    async create(spaces: SpaceGroup[]): Promise<SpaceGroup[]> {
        const spaceEntities = await this.spaceGroupRepository.save(spaces);
        return spaceEntities.map(SpaceGroupMapper.toDomine);
    }

    async update(space: SpaceGroup): Promise<SpaceGroup> {
        await this.spaceGroupRepository.update(space.id, space);
        const spaceEntity = await this.spaceGroupRepository.findOne({ where: { id: space.id } });
        return SpaceGroupMapper.toDomine(spaceEntity)
    }

    async delete(id: string) {
        await this.spaceGroupRepository.delete(id);
    }

    async deleteAllBetweenDates(from: Date, to: Date) {
        await this.spaceGroupRepository.delete({
            day: Between(from, to),
        });
    }

    async findAll(filters: SpaceGroupFilter): Promise<SpaceGroup[]> {
        const whereConditions: Record<string, any> = {};

        if (filters.id && filters.id.length > 0) whereConditions.id = In(filters.id);
        if (filters.plant && filters.plant.length > 0) whereConditions.plant = In(filters.plant);
        if (filters.type && filters.type.length > 0) whereConditions.type = In(filters.type);
        if (filters.day && filters.day.length > 0) whereConditions.day = In(filters.day);
        if (filters.fromDate && filters.toDate) whereConditions.day = Between(filters.fromDate, filters.toDate);

        const spaceEntities = await this.spaceGroupRepository.find({ where: whereConditions });
        return spaceEntities.map(SpaceGroupMapper.toDomine);
    }
}
