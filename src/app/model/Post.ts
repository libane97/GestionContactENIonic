export class Post {
    id: number;
    title: string="";
    message: string="";
    picture:string="";
    likes: number;
    static fromJson(json: any) {
         if (!json) {
             return null;
         }
         else {
               const p = new Post();
               p.id = json.id;
               p.title = json.title;
               p.message = json.message;
               p.picture = json.picture;
               p.likes = json.likes;
               return p;
         }
    }
}