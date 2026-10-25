/**
 * [INPUT]: Match participant birth data
 * [OUTPUT]: Birth data with one resolved true-solar-time result
 * [POS]: Shared preparation step before match chart generation
 */

import type { BirthInfo } from './astro'
import { resolveBirthTimeAsync } from './true-solar-time'

export async function resolveMatchBirthInfo(info: BirthInfo): Promise<BirthInfo> {
  const birthplace = info.birthplace?.trim() || undefined
  const trueSolarEnabled = info.trueSolarEnabled ?? true
  const resolvedBirthTime = await resolveBirthTimeAsync({
    year: info.year,
    month: info.month,
    day: info.day,
    hour: info.hour,
    birthplace,
    enabled: trueSolarEnabled,
  })

  return {
    ...info,
    birthplace,
    trueSolarEnabled,
    resolvedBirthTime,
  }
}
