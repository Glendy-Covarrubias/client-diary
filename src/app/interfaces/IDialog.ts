/**Attributes that will be incorporated for the dialog */
export interface IDialog {
    info: any | null;
    edit?: boolean;
    title?: string;
}

export const defaultDialog: IDialog  = {
    info: null,
    edit: false,
    title: ""
}