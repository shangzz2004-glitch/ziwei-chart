import { describe, expect, it } from 'vitest'
import { resolveMatchBirthInfo } from './match-birth-info'

describe('resolveMatchBirthInfo', () => {
  it('resolves each participant independently before match chart generation', async () => {
    const [laoling, lanzhou] = await Promise.all([
      resolveMatchBirthInfo({
        year: 2004,
        month: 2,
        day: 15,
        hour: 8,
        gender: 'male',
        birthplace: '山东省德州市乐陵',
        trueSolarEnabled: true,
      }),
      resolveMatchBirthInfo({
        year: 2003,
        month: 3,
        day: 24,
        hour: 8,
        gender: 'female',
        birthplace: '甘肃省兰州市城关区',
        trueSolarEnabled: true,
      }),
    ])

    expect(laoling.resolvedBirthTime?.applied).toBe(true)
    expect(laoling.resolvedBirthTime?.location?.name).toBe('乐陵市')
    expect(laoling.resolvedBirthTime?.correctedShichen).toBe('辰时')
    expect(lanzhou.resolvedBirthTime?.applied).toBe(true)
    expect(lanzhou.resolvedBirthTime?.location?.name).toBe('城关区')
    expect(lanzhou.resolvedBirthTime?.originalShichen).toBe('辰时')
    expect(lanzhou.resolvedBirthTime?.correctedShichen).toBe('卯时')
  })

  it('keeps the original shichen when birthplace matching is unavailable', async () => {
    const result = await resolveMatchBirthInfo({
      year: 2000,
      month: 1,
      day: 1,
      hour: 8,
      gender: 'female',
      birthplace: '未收录地点',
      trueSolarEnabled: true,
    })

    expect(result.resolvedBirthTime?.applied).toBe(false)
    expect(result.resolvedBirthTime?.originalShichen).toBe('辰时')
    expect(result.resolvedBirthTime?.correctedShichen).toBe('辰时')
  })
})
