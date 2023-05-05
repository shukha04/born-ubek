import ClickIcon from '@/assets/icons/click.svg'
import EmailIcon from '@/assets/icons/email.svg'
import FacebookIcon from '@/assets/icons/facebook.svg'
import InstagramIcon from '@/assets/icons/instagram.svg'
import MastercardIcon from '@/assets/icons/mastercard.svg'
import PaymeIcon from '@/assets/icons/payme.svg'
import PhoneIcon from '@/assets/icons/phone.svg'
import TelegramIcon from '@/assets/icons/telegram.svg'
import UzcardIcon from '@/assets/icons/uzcard.svg'
import UzumIcon from '@/assets/icons/uzum.svg'
import VisaIcon from '@/assets/icons/visa.svg'
import classes from '@/components/footer.module.scss'
import useScrollY from '@/hooks/useScrollY'
import { Unbounded } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const unbounded = Unbounded({
	subsets: ['cyrillic'],
	weight: ['600', '700'],
	style: 'normal'
})

const Footer = () => {
	const footerRef = useRef<HTMLDivElement>(null)

	const [footerHeight, setFooterHeight] = useState<number>(0)

	const scrolled = useScrollY(y => y > 0)

	useEffect(() => {
		const handleSetFooterHeight = () => {
			setFooterHeight(footerRef.current?.clientHeight || 0)
		}

		window.addEventListener('resize', handleSetFooterHeight)

		handleSetFooterHeight()

		return () => {
			window.removeEventListener('resize', handleSetFooterHeight)
		}
	}, [])

	return (
		<footer style={{height: footerHeight, maxHeight: 'calc(100svh - 80px)'}}>
			<div className={classes.footer} ref={footerRef} style={{position: scrolled ? 'fixed' : 'relative'}}>
				<div className={classes.container}>
					<div className={classes.emailSection}>
						<div className={classes.emailSection__info}>
							<p>Подпишитесь на нашу рассылку</p>
							<small>получайте обновления о коллекциях, продуктах и новостях прямо на свой почтовый ящик </small>
						</div>
						<form className={classes.emailSection__form} onSubmit={(e) => e.preventDefault()}>
							<input type='email' placeholder='Введите свою почту' />
							<button type='submit'>Подписаться</button>
						</form>
					</div>
					<div className={classes.infoSection}>
						<div className={classes.logo}>
							<div className={classes.image}>
								<Image src='/logo.svg' alt='BORN UZBEK - Основная миссия - развитие патриотизма' fill />
							</div>
							<small>Основная миссия - развитие патриотизма</small>
						</div>
						<div className={classes.about}>
							<h3 className={[classes.footerTitle, unbounded.className].join(' ')}>Навигация</h3>
							<a className={classes.footerLink} href='#products'>Продукция</a>
							<a className={classes.footerLink} href='#about'>О бренде</a>
							<a className={classes.footerLink} href='#contacts'>Контакты</a>
						</div>
						<div className={classes.about}>
							<h3 className={[classes.footerTitle, unbounded.className].join(' ')}>Для клиента</h3>
							<Link className={classes.footerLink} href='#'>Доставка и оплата</Link>
							<Link className={classes.footerLink} href='#'>Условия возврата</Link>
							<Link className={classes.footerLink} href='#'>Публичная оферта</Link>
						</div>
						<div className={classes.contacts} id='contacts'>
							<h3 className={[classes.footerTitle, unbounded.className].join(' ')}>Контакты</h3>
							<a className={classes.footerLink} href='tel:+998 33 695 95 50'><PhoneIcon />+998 33 695 95 50</a>
							<a className={classes.footerLink} href='mailto:info@bornuzbek.uz'><EmailIcon />info@bornuzbek.uz</a>
							<div className={classes.row}>
								<a className={classes.footerLink} href='https://youtube.com' target='_blank' rel='noreferrer'>
									<InstagramIcon />
								</a>
								<a className={classes.footerLink} href='https://youtube.com' target='_blank' rel='noreferrer'>
									<TelegramIcon />
								</a>
								<a className={classes.footerLink} href='https://youtube.com' target='_blank' rel='noreferrer'>
									<FacebookIcon />
								</a>
							</div>
						</div>
						<div className={classes.payments}>
							<h3 className={[classes.footerTitle, unbounded.className].join(' ')}>Способы оплаты</h3>
							<div>
								<button><VisaIcon /></button>
								<button><MastercardIcon /></button>
								<button><UzumIcon /></button>
								<button><PaymeIcon /></button>
								<button><UzcardIcon /></button>
								<button><ClickIcon /></button>
							</div>
						</div>
					</div>
				</div>
				<div className={classes.authorship}>
					<div className={classes.container}>
						<small>© Bornuzbek 2022. Все права защищены.</small>
						<a href='https://www.instagram.com/geekon.dev/' rel='noreferrer' target='_blank'>Created by GeekOn</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
