import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/generic-repository.service';
import { Customer } from 'src/schemas/models/customer';

@Injectable()
export class CustomerService extends BaseService<Customer & Document> {

    constructor(@InjectModel(Customer.name) protected readonly _customerModel: Model<Customer & Document>
           ) {
    super(_customerModel);

  }
 }
