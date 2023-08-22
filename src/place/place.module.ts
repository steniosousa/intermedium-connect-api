import { Module } from "@nestjs/common";
import { PlaceController } from "./controller/place.controller";
import { PlaceService } from "./service/place.service";
import { databaseModule } from "database/database.module";

@Module({
    controllers:[PlaceController],
    providers:[PlaceService],
    imports:[databaseModule]
})

export class placeModule {}