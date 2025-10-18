import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LocaisModule } from './locais/locais.module';

@Module({
  imports: [UserModule, LocaisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}