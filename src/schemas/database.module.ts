import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://root:Computer6@139.59.76.143:30335')],
    controllers: [],
    providers: [],
})
export class DatabaseModule {}
