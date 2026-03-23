export interface IDirection {
    id: string;
    number: string;
    title: string;
    description: string;
};

export type IDirectionCategory = {
    id: string;
    directionId: IDirection["id"];
    title: string;
    order: number;
};