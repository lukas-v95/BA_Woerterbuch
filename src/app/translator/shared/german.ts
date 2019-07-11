
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

    export class German implements ReverseTranslation {
        reverseGerman2DialectLanguage: string;
        reverseGerman2DialectIdList: string[];
        german: German;

        constructor(german: German){
            this.german = german;
        }

    }



