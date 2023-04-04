let curentEffect = null
class Dep {
  constructor(value) {
    this._value = value
    this.effects =  new Set()
  }
  get value() {
    this.depend()
    return this._value
  }
  set value(value) {
    this._value = value
    this.notice()
  }
  depend() {
    if (curentEffect) {
      this.effects.add(curentEffect)
    }
  }
  notice() {
    this.effects.forEach(effect => {
      effect()
    })
  }
}
export const effectWatch = (effect) => {
  curentEffect = effect
  effect()
  curentEffect = null
}
export const ref = (value) => {
  return new Dep(value)
}
const targetsMap = new Map()
const getDep = (target, key) => {
  let depsMap = targetsMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetsMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      getDep(target, key).depend()
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      const result = Reflect.set(target, key, value)
      getDep(target, key).notice()
      return result
    },
    deleteProperty(target, key) {
      
      // getDep(target, key).notice()
      return Reflect.deleteProperty(target, key)
    }
  })
}