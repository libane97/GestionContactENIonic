export class contact {
    id: number;
    name: string="";
    telephone: string="";
    address:string="";
    civility:string="";

    static fromJson(json: any) {
         if (!json) {
             return null;
         }
         else {
               const c = new contact();
               c.id = json.id;
               c.name = json.name;
               c.telephone = json.telephone;
               c.address = json.address;
               c.civility = json.civility;
               return c;
         }
    }
}
