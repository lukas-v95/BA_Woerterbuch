
export interface PartOfSpeech {
    partOfSpeechs: string[];
}

export interface LinguisticUsage {
    linguisticUsages: string[];
}

export interface SynonymObjectList {
    entryId: string;
    entryName: string;
}

export interface Dialect {
    dialectId: string;
    dialectEntry: string;
    dialectEntryLowerCase: string;
    partOfSpeech: PartOfSpeech;
    linguisticUsage: LinguisticUsage;
    refToGermanId: string;
    synonymObjectList: SynonymObjectList[];
}

export interface RootObject {
    dialect: Dialect;
}

export class Dialect implements Dialect {
    dialect: Dialect;

    constructor(dialect: Dialect){
        this.dialect = dialect;
    }
}
