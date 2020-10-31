import { Injectable } from '@nestjs/common';
import { ClientSession, Types } from 'mongoose';
import { IUnitOfWork } from 'src/common/i.unit-of-work.service';
import { Customer } from 'src/persistence/customers-aggregate/customer.schema.';
import { ICustomerService } from 'src/persistence/customers-aggregate/i.customer.service';
import { IPaymentService } from 'src/persistence/payment-aggregate/i.payment.service';
import { Payment } from 'src/persistence/payment-aggregate/payment';
import { CreateCustomerMapper } from './create-customer-mapper';
import { CreateCustomerRequest } from './create-customer-request';

@Injectable()
export class CreateCustomerService {
    constructor(
        private readonly customerService: ICustomerService<Customer & Document>,
        private readonly paymentService: IPaymentService<Payment & Document>,
        private readonly mapper: CreateCustomerMapper,
        private readonly unitOfWork: IUnitOfWork
    ) {
    }

    async Handle(body: CreateCustomerRequest) {
        let trans: ClientSession;
        await this.unitOfWork.startSession();
        const customer = this.mapper.request(body);
        await this.customerService.insert([customer], trans);
        const payment: Partial<Payment> = {
            amount: 987,
            customerId: Types.ObjectId('5f9d19424274fa2a883e61fc')
        }
        await this.paymentService.insert([payment], trans);

        await this.unitOfWork.commitTransaction(trans);
    }

}
