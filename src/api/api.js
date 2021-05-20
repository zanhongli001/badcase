import { fetchPost,fetchGet} from '../utils/request'
import qs from 'qs'
// let loading =  this.$loading({
//     lock: true,
//   });
// 底库数据列表
export function getPolList(params){
    return  fetchGet('/policy/task/',params).then((res) =>{
return res.data
    })
}
// 底库状态
export function getPolStatus(){
    return  fetchGet('policy/meta/task_status/').then((res) =>{
        console.log(res,'res')
return res.data
    })
}
// 底库列表结果
export function getPolRes(){
    return  fetchGet('policy/meta/task_result/').then((res) =>{
        console.log(res)
return res.data
    })
}
//底库列表问题类型
export function getPolType(){
    return  fetchGet('policy/meta/task_type/').then((res) =>{
        console.log(res)
return res.data
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
        // console.log(res)
return res.data
    })
}
// 提交底库数据详情
export function subPolDetail(data){
    // console.log(data)
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
return res.data
    })
}

// 上传badcase数据
export function uplodBad(data){
    console.log(data)
    return fetchPost('/AIBadCase',data).then((res) => {
        // console.log(res)
        return res
    })
}
// badcase状态
export function getBadStatus(){
    return  fetchGet('badcase/meta/task_status/').then((res) =>{
        console.log(res,'res')
return res.data
    })
}
// badcase结果
export function getBadRes(){
    return  fetchGet('badcase/meta/task_result/').then((res) =>{
        console.log(res)
return res.data
    })
}
//badcase问题类型
export function getBadType(){
    return  fetchGet('badcase/meta/task_type/').then((res) =>{
        console.log(res)
return res.data
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
    return fetchGet(`badcase/task/${params}/`).then((res) =>{
        return res.data
    })
}
// badcase上传获取场景分类
export function getBadIfy(params){
    return  fetchGet('badcase/scene_category/',params).then((res) =>{
        console.log(res)
return res.data.results
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