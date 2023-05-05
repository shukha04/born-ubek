import Loading from '@/components/loading'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

const App = ({Component, pageProps}: AppProps) => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const handleLoaded = () => {
			setLoading(false)
		}

		setTimeout(handleLoaded, 400)
	}, [])

	return loading ? <Loading /> : <Component {...pageProps} />
}

export default App
