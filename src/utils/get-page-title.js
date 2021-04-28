import defaultSettings from '@/settings'

const title = defaultSettings.title || '广电底库数据工具'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
