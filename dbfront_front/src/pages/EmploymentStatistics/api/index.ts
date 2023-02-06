import service from '@/api/service'

export const EmploymentStatisticsList = (currentType: string) => {
  return service({
    url: `/nodeServe/employmentStatisticsList/${currentType}`,
    method: 'get',
  })
}
