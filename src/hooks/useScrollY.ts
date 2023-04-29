import { useSyncExternalStore } from 'react'

const subscribe = (handler: () => void) => {
	global.window?.addEventListener('scroll', handler)

	return () => {
		global.window?.removeEventListener('scroll', handler)
	}
}

const useScrollY = (selector = (y: any) => y) => {
	return useSyncExternalStore(subscribe, () => selector(global.window?.scrollY), () => undefined)
}

export default useScrollY
