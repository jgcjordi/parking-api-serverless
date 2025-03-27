import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { SpaceGroup } from "../../domain/SpaceGroup";

@Entity({ name: "space_group" })
export class SpaceGroupEntity implements SpaceGroup {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date", nullable: false })
  day: Date;

  @Column({ type: "int", nullable: false })
  floor: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  type: string;

  @Column({ type: "int", nullable: false })
  spaces: number;

  @Column({ name: "used_spaces", type: "int", nullable: false })
  usedSpaces: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
