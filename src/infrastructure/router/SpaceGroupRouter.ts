import { Router } from "express";
import { SpaceGroupController } from "../controller/SpaceGroupController";
import { SpaceGroupService } from "../../application/SpaceGroupService";
import { SpaceGroupProviderImpl } from "../provider/SpaceGroupProviderImpl";
import { DataSource } from "typeorm";

const spaceGroupsRouter = (dataSource: DataSource) => {
  const router = Router();
  const basePath = "/space-group";

  router.use(async (req, res, next) => {
    try {
      console.log("🟡 Starting Data Source...");
      if (dataSource.isInitialized) {
        console.log("✅ Data source still connected.");
        return next();
      }
      await dataSource.initialize();
      console.log("✅ Data source connected.");
      next();
    } catch (err) {
      console.error("❌ Error connecting to DB:", err);
      res.status(500).json({ error: "Error connecting to DB" });
    }
  });

  const spaceGroupProvider = new SpaceGroupProviderImpl(dataSource);
  const spaceGroupService = new SpaceGroupService(spaceGroupProvider, dataSource);
  const spaceGroupController = new SpaceGroupController(spaceGroupService);

  router.post(`${basePath}`, (req, res) => spaceGroupController.create(req, res));
  router.put(`${basePath}/:id`, (req, res) => spaceGroupController.update(req, res));
  router.delete(`${basePath}/:id`, (req, res) => spaceGroupController.delete(req, res));
  router.post(`${basePath}/find-all`, (req, res) => spaceGroupController.findAll(req, res));
  router.post(`${basePath}/replicate`, (req, res) => spaceGroupController.replicate(req, res));

  return router;
};

export default spaceGroupsRouter;