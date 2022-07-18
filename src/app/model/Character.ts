export interface Character {
  url: string;
  name: string;
  gender:string;
  culture: string;
  born: string;
  died: string;
  titles: Array<string>;
  aliases: Array<string>;
  father: string;
  mother: string;
  spouse: string;
  allegiances: string;
  books: Array<string>;
  povBooks: Array<String>;
  tvSeries: Array<string>;
  playedBy: Array<string>;
}
