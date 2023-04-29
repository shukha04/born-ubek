import LinkIcon from '@/assets/icons/link.svg'
import StarIcon from '@/assets/icons/star.svg'
import classes from '@/components/product-card.module.scss'
import { Nunito_Sans } from 'next/font/google'
import Image from 'next/image'

type ProductCardProps = {
	product: {
		title: string
		image: string
		type: string
		material: string
		description: string
		price: number
		url: string
	}
}

const nunitoSans = Nunito_Sans({
	preload: true,
	weight: ['600', '700'],
	subsets: ['cyrillic']
})

const ProductCard = ({product}: ProductCardProps) => {
	return (
		<div className={classes.card}>
			<span className={classes.type}>{product.type}</span>
			<span className={classes.material} data-content={product.material} role='tooltip'><StarIcon /></span>
			<Image src={product.image} alt={product.type + ' ' + product.title} fill />
			<div className={classes.info}>
				<h2 className={nunitoSans.className}>{product.title}</h2>
				<h3 className={nunitoSans.className}>{new Intl.NumberFormat().format(product.price)} сум</h3>
				<p>{product.description}</p>
				<a href={product.url} target='_blank' rel='noreferrer'>Купить <LinkIcon /></a>
			</div>
		</div>
	)
}

export default ProductCard
