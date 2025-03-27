import { Request, Response } from "express";
import { SpaceGroupService } from "../../application/SpaceGroupService";
import { SpaceGroup, SpaceGroupFilter } from "../../domain/SpaceGroup";
import { SpaceGroupReplicateDTO } from "../../application/dto/SpaceGroupReplicateDTO";

export class SpaceGroupController {

  constructor(private spaceGroupService: SpaceGroupService) { }

  async create(req: Request<{}, {}, SpaceGroup[]>, res: Response): Promise<void> {
    try {
      const createdSpaceGroups = await this.spaceGroupService.create(req.body);
      res.status(201).json(createdSpaceGroups);
    } catch (error) {
      console.log("message:", error.message)
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request<{ id: string }, {}, SpaceGroup>, res: Response): Promise<void> {
    try {
      const updatedSpaceGroups = await this.spaceGroupService.update(req.body);
      updatedSpaceGroups === null ?
        res.status(404).json(updatedSpaceGroups) :
        res.status(201).json(updatedSpaceGroups);
    } catch (error) {
      console.log("message:", error.message)
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.spaceGroupService.delete(id);
      res.status(200).send();
    } catch (error) {
      console.log("message:", error.message)
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request<{}, {}, SpaceGroupFilter>, res: Response): Promise<void> {
    try {
      const spaceGroups = await this.spaceGroupService.findAll(req.body);
      res.status(200).json(spaceGroups);
    } catch (error) {
      console.log("message:", error.message)
      res.status(500).json({ message: error.message });
    }
  }

  async replicate(req: Request<{}, {}, SpaceGroupReplicateDTO>, res: Response): Promise<void> {
    try {
      const spaceGroups = await this.spaceGroupService.replicate(req.body);
      res.status(200).json(spaceGroups);
    } catch (error) {
      console.log("message:", error.message)
      res.status(500).json({ message: error.message });
    }
  }

}