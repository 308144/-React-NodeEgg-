import service from '@/api/service'

export const EmploymentStatisticsList = (currentType: string) => {
  return service({
    url: `/front/employmentStatisticsList/${currentType}`,
    method: 'get',
  })
}
