import { SqlRepositoryService } from './../service/sql-repository.service';
import { LsRepositoryService } from './../service/ls-repository.service';
export class manager{
    storage;
    sqlite;
    constructor(private ls:LsRepositoryService, private sql:SqlRepositoryService) { 
            this.storage = ls;
            this.sqlite = sql;
    }
}