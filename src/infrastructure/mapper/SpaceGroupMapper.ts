import { SpaceGroup } from "../../domain/SpaceGroup";
import { SpaceGroupEntity } from "../entity/SpaceGroupEntity";

export class SpaceGroupMapper {
    static toDomine(spaceEntity: SpaceGroupEntity): SpaceGroup {
        return {
            id: spaceEntity.id,
            day: spaceEntity.day,
            plant: spaceEntity.plant,
            type: spaceEntity.type,
            spaces: spaceEntity.spaces,
            usedSpaces: spaceEntity.usedSpaces,
        };
    }

    static toEntity(space: SpaceGroup): SpaceGroupEntity {
        return {
            id: space.id,
            day: space.day,
            plant: space.plant,
            type: space.type,
            spaces: space.spaces,
            usedSpaces: space.usedSpaces,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}