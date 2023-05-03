import Image from 'next/image'

export type InstaPostType = {
	id: string
	caption: string
	media_type: 'VIDEO' | 'CAROUSEL_ALBUM' | 'IMAGE'
	media_url: string
	permalink: string
}

const InstaPost = ({id, caption, media_type, media_url}: InstaPostType) => {
	let post

	switch (media_type) {
		case 'VIDEO':
			post = (
				<video
					autoPlay
					muted
					loop
					disablePictureInPicture
					aria-disabled
					disableRemotePlayback
					poster='/main-bg-preview.jpg'
					preload='true'
					controls={false}
					playsInline
				>
					<source src={media_url} type='video/mp4' />
				</video>
			)
			break
		case 'CAROUSEL_ALBUM':
			post = (
				<Image fill id={id} src={media_url} alt={caption} />
			)
			break
		default:
			post = (
				<Image fill id={id} src={media_url} alt={caption} />
			)
	}

	return (
		<>
			{post}
		</>
	)
}

export default InstaPost
