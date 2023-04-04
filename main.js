import { effectWatch } from './core/reactivity.js'
import { mountElement } from './core/renderer.js'

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const setupResult = rootComponent.setup()
      effectWatch(() => {
        const app = document.querySelector(rootContainer)
        app.textContent = ''
        const subTree = rootComponent.render(setupResult)
        mountElement(subTree, app)
      })
    }
  }
}
