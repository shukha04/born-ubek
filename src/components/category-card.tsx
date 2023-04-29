import classes from '@/components/category-card.module.scss'
import { Nunito_Sans } from 'next/font/google'
import Image from 'next/image'

type CategoryCardProps = {
	category: { key: string, name: string, image: string }
	className?: string
	onClick: (category: string) => void
}

const nunitoSans = Nunito_Sans({
	preload: true,
	weight: ['400'],
	subsets: ['cyrillic']
})

const CategoryCard = ({category, className, onClick}: CategoryCardProps) => {
	const clickHandler = () => {
		onClick(category.key)
	}

	return (
		<div className={[classes.card, className].join(' ')} role='button' onClick={clickHandler}>
			<Image src={category.image} alt={category.name} fill />
			<header>
				<h2 className={nunitoSans.className}>{category.name.split(' ').join('\n')}</h2>
			</header>
		</div>
	)
}

export default CategoryCard
