import classes from '@/components/loading.module.scss'
import Image from 'next/image'

const Loading = () => {
	return (
		<div className={classes.loading}>
			<div className={classes.logo_wrapper}>
				<Image
					src='/logo.svg'
					alt='BORN UZBEK logotype'
					fill
				/>
			</div>
		</div>
	)
}

export default Loading
