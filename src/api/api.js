import { fetchPost,fetchGet} from '../utils/request'
import qs from 'qs'
import {Loading} from 'element-ui'
// let loading =  this.$loading({
//     lock: true,
//   });
// 底库数据列表
export function getPolList(params){
    return  fetchGet('/AIBaseAuditList',params).then((res) =>{
return res.data.data
    }).catch(() => {
        Loading.close()
    })
}

// 获取底库数据详情
export function getPolDetail(params){
    return  fetchGet(`/AIBaseAuditDetail?id=${params}`).then((res) =>{
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
    return  fetchGet('/AIBadcaseFeedbackList',params).then((res) =>{
return res.data.data
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