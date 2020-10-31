import { ClientSession } from "mongoose";

export abstract class IUnitOfWork {
    abstract startSession(): Promise<ClientSession>;
    abstract commitTransaction(session: ClientSession);
    abstract abortTransaction(session: ClientSession);
}