import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/generic-repository.service';
import { Payment } from 'src/schemas/models/payment';

@Injectable()
export class GetPaymentListService extends BaseService<Payment & Document> {

    constructor(@InjectModel(Payment.name) protected readonly _model: Model<Payment & Document>
           ) {
    super(_model);
}
}
