import service from '@/api/service'

export const findDetailData = data => {
  return service({ url: `/front/findDetailData`, data, method: 'post' })
}
