import { DataSource } from "typeorm"
import { SpaceGroupEntity } from "../entity/SpaceGroupEntity"

export const dataSourceLocal = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: "parking-api-db",
    entities: [SpaceGroupEntity],
    logging: true,
    synchronize: false,
})

export const dataSourceAuroraAWS = new DataSource({
    type: "postgres",
    host: "parkingaurora.cluster-xxxxxx.eu-west-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "postgres",
    entities: [SpaceGroupEntity],
    logging: false,
    synchronize: false
})
