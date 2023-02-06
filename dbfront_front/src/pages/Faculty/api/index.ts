import service from '@/api/service'


// 查询学院
export const findAllFaculty = data => {
  return service({ url: `/front/findAllFaculty`, data: data, method: 'post' })
}
// 删除学院
export const removeOneFaculty = data => {
  return service({ url: `/front/removeOneFaculty/${data}`, method: 'get' })
}
// 创建用户
export const echoOneFacultyData = data => {
  return service({ url: `/front/echoOneFacultyData/${data}`, method: 'get' })
}
