import service from '@/api/service'

// 查询所有院系信息
export const getFacultyData = () => {
  return service({ url: '/front/getFacultyData', method: 'get' })
}
