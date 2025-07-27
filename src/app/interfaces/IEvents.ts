/* export interface IEvent {

    // EVENTS PROVISIONA
    title: string; //he cambiado titulo por 'title'
    description: string;
    price: number;
    date: Date;

    capacity: number;
    address: string;

    latitude: number;
    longitude: number;
    status: boolean;
} */


export interface IEvent {
    id: number
    title: string
    description: string
    date: Date
    price: number
    capacity: number
    address: string
    latitude: number
    longitude: number
    image: string
    status: number
    categories_id: number
    users_id: number
}

