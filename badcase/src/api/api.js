import { fetchPost,fetchGet} from '../utils/request'
import qs from 'qs'
// 底库数据列表
export function getPolList(params){
    return  fetchGet('/AIBaseAuditList',params).then((res) =>{
return res.data.data
    })
}

// 获取底库数据详情
export function getPolDetail(params){
    return  fetchGet(`/AIBaseDataList?id=${params}`).then((res) =>{
return res.data.data.ai_type
    })
}
// 提交底库数据详情
export function subPolDetail(data){
    console.log(data)
    return fetchPost('/AIBaseAudit',data).then((res) => {
return res
    })
}

// 上传底库数据

// export function 