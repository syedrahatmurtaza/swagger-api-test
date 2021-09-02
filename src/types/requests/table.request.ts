export interface ITableAddRequest {
  tableNo: number
  person: number
}

export interface ITableUpdateRequest {
  _id: string
  tableNo: number
  person: number
}

export interface ITableGetRequest {
  _id: string
}
