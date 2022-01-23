import defaultSettings from '@/settings'

const title = defaultSettings.title || '智慧行政平台'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}
