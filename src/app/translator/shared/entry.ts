
export class Entry implements RootObject {

  dialectA: DialectA;
  german: German;
  dialectB: DialectB;


  constructor(rootObj: RootObject) {
      this.dialectA = rootObj.dialectA;
      this.german = rootObj.german;
      this.dialectB = rootObj.dialectB;
  }
}


export interface PartOfSpeech {
        partOfSpeechs: string[];
    }

    export interface LinguisticUsage {
        linguisticUsages: string[];
    }

    export interface DialectA {
        dialectId: string;
        dialectEntry: string;
        dialectEntryLowerCase: string;
        partOfSpeech: PartOfSpeech;
        linguisticUsage: LinguisticUsage;
        refToGermanId: string;
        synonymIds: any[];
    }

    export interface ReverseTranslation {
        reverseGerman2DialectLanguage: string;
        reverseGerman2DialectIdList: string[];
    }

    export interface German {
        germanId: string;
        germanEntry: string;
        germanEntryLowerCase: string;
        reverseTranslations: ReverseTranslation[];
    }

    export interface PartOfSpeech2 {
        partOfSpeechs: string[];
    }

    export interface LinguisticUsage2 {
        linguisticUsages: string[];
    }

    export interface DialectB {
        dialectId: string;
        dialectEntry: string;
        dialectEntryLowerCase: string;
        partOfSpeech: PartOfSpeech2;
        linguisticUsage: LinguisticUsage2;
        refToGermanId: string;
        synonymIds: any[];
    }

    export interface RootObject {
        dialectA: DialectA;
        german: German;
        dialectB: DialectB;
    }
