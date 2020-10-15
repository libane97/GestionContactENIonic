import { Etudiant } from './database.service';
import { BaseModel } from './../model/BaseModel';
export interface Repository {
    getAll();
    add(p: BaseModel);
    edite(p: BaseModel);
    delete(p: BaseModel);
    find(): BaseModel[];
    getById(id): Promise<Etudiant>;
}    