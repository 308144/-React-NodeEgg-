export function convertListDataToProTable(res) {
  const output = {
    current: 1,
    data: [],
    pageSize: '20',
    success: false,
    total: 0,
  }

  if (res.code === 0) {
    const { data } = res

    if (!data) {
      return output
    }

    Object.assign(output, {
      success: true,
      data: data.records,
      current: data.current,
      pageSize: data.size,
      total: data.total,
    })
  }

  return output
}
export function DpGo(path: string): void {
  window.location.hash = `${path}$`
}
