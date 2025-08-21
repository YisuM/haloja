export interface OrderType {
    id: string
    typeOfServer: string
    status: string
    userId: string
    requestAt: string
}

export interface ServerType {
    id: string
    name: string
    cpu: string
    memory: string
    region: string
    status: string
    public_ip: string
    date_string: string
    icon: string
}