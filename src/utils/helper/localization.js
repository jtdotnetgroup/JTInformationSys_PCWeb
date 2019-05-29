import store from '@/store'

export function Localization (key, sourceName) {
  const source = store.state.localizations.localizationSources
  if (source) {
    var localizationSources = source[sourceName]

    if (localizationSources) {
      var keys = Object.keys(localizationSources)
      for (let index = 0; index < keys.length; index++) {
        const e = keys[index]
        if (key === e) {
          return localizationSources[e]
        }
      }
      return key
    }
  } else {
    return key
  }
}
