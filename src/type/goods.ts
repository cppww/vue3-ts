export interface ListInt{
    userId: number,
    id: number,
    title: string,
    introduce: string
}
interface selectDataInt{
    title: string,
    introduce: string,
    page: number, //页码
    count: number, // 总条数
    pagesize: number
}
export class InitData{
    selectData: selectDataInt={
        title:"",
        introduce:"",
        page:1,
        count:0,
        pagesize:5
    }
    list:ListInt[]=[]
}