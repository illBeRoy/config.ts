export type TString = 'string';
export type TNumber = 'number';
export type TBoolean = 'boolean';

export type TConfigVariable = TString | TNumber | TBoolean;

export interface ConfigurationStructure {
  [key: string]: TConfigVariable;
}

export type ConfigurationOutput<TStructure> = {
  [k in keyof TStructure]:
    TStructure[k] extends TString ? string :
    TStructure[k] extends TNumber ? number :
    TStructure[k] extends TBoolean ? boolean :
    null;
};
