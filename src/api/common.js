import { fetchPost, fetchGet } from '@/utils/request'
// 数据类型列表
export function typeList() {
  return fetchGet('/policy/meta/task_type/').then((res) => {
    return res.data
  })
}