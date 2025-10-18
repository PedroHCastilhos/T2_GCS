import { Module } from "@nestjs/common";
import { LocaisController } from "./locais.controller";
import { LocaisService } from "./locais.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [LocaisController],
    providers: [LocaisService, PrismaService]
})
export class LocaisModule {}