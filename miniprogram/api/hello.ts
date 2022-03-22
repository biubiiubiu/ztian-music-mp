import { get } from "./request"

export const sayHelo = () => {
    return get('/hello')
}