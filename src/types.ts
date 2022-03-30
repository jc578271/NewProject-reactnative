export interface RawContact {
    id: string,
    firstName: string,
    lastName: string,
    organization: string,
    phones: string[],
    emails: string[],
    addresses: string[],
    birthday: number[],
    avatar: string,
}

export interface RawCollection {
    id: string,
    title: string,
    list: []
}
export interface RawAuth {
    userId: string,
    username: string,
    career: string
}