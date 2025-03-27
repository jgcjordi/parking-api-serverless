import { SpaceGroup } from "../../domain/SpaceGroup";
import { SpaceGroupEntity } from "../entity/SpaceGroupEntity";

export class SpaceGroupMapper {
    static toDomine(spaceEntity: SpaceGroupEntity): SpaceGroup {
        return {
            id: spaceEntity.id,
            day: spaceEntity.day,
            floor: spaceEntity.floor,
            type: spaceEntity.type,
            spaces: spaceEntity.spaces,
            usedSpaces: spaceEntity.usedSpaces,
        };
    }

    static toEntity(space: SpaceGroup): SpaceGroupEntity {
        return {
            id: space.id,
            day: space.day,
            floor: space.floor,
            type: space.type,
            spaces: space.spaces,
            usedSpaces: space.usedSpaces,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}