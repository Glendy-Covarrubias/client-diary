/**Attributes that will be incorporated for the dialog */
export interface IDialog {
    info: any | null;
    edit: boolean;
}

export const defaultDialog: IDialog  = {
    info: null,
    edit: false
}