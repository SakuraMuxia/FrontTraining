import request from "../http"
import { IUsersResponse } from "./model/githubType"
export const getUsers = (keyword: string) => {
    return request.get<any, IUsersResponse>('/search/users', {
        params: {
            q: keyword
        }
    })
}