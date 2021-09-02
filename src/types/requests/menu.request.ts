export interface IMenuCreateRequest {
    name: string
}

export interface IMenuInsertItemRequest {
    _id: string,
    item: {
        _id: string
    }
}