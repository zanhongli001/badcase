import { fetchPost,fetchGet} from '../utils/request'
import qs from 'qs'
// let loading =  this.$loading({
//     lock: true,
//   });
// 底库数据列表
export function getPolList(params){
    return  fetchGet('/policy/task/',params).then((res) =>{
return res.data.results
    })
}
// 底库上传里分类请求
export function getPolIfy(params){
    return  fetchGet('policy/task_category/',params).then((res) =>{
return res.data
    })
}

// 获取底库数据详情
export function getPolDetail(params){
    return  fetchGet(`/policy/task/${params}/`).then((res) =>{
        console.log(res)
return res.data
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

export function uplodPol(data){
    return fetchPost('/UploadAIBaseData',data).then((res) => {
        return res
    })
}

// 查询地库数据
export function queryPol(params){
    return fetchGet('/AIBaseDataList',params).then((res) =>{
        return res.data.data
    })
}
// badcase列表
export function getBadList(params){
    return  fetchGet('badcase/task/',params).then((res) =>{
        console.log(res)
return res.data.results
    })
}

// 上传badcase数据
export function uplodBad(data){
    console.log(data)
    return fetchPost('/AIBadCase',data).then((res) => {
        console.log(res)
        return res
    })
}

// badcase 批量查看图片

export function watchAllImg(params){
    return fetchGet(`/AIBatchImages?task_id=${params}`).then((res) =>{
        console.log(res.data.data.feedback_image)
        return res.data.data.feedback_image
    })
}

// badcase 获取详情

export function getCaseDetail(params){
    return fetchGet(`/AIBadcaseFeedBackDetail?id=${params}`).then((res) =>{
        console.log(res)
        return res.data.data.ai_type
    })
}

// badcase 提交详情

// 上传badcase数据
export function subBadDetail(data){
    console.log(data)
    return fetchPost('/AIBadCaseFeedback',data).then((res) => {
        console.log(res)
        return res
    })
}