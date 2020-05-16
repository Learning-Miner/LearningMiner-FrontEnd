export class Concept {
  text: string;
  x: number;
  y: number;
  id: string;
}

export class Proposition {
  text: string;
  frm: string;
  to: string;
}

export class ConceptMap {
  id: string;
  uid: string;
  title: string;
  isBase?: boolean;
  dateCreated?: Date;
  dateFinished?: Date;
  concepts?: Concept[];
  propositions?: Proposition[];
}

export class Map {
  id: string;
  baseId: string;
  title: string;
  string: string;
  Message: string;
}
