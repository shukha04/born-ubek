import classes from '@/components/footer.module.scss'
import Image from "next/image";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.emailSection}>
                    <div className={classes.emailSection__info}>
                        <p>Подпишитесь на нашу рассылку</p>
                        <small>получайте обновления о коллекциях, продуктах и новостях прямо на свой почтовый ящик </small>
                    </div>
                    <form className={classes.emailSection__form}>
                        <input id="inputEmail" type="email" placeholder="Введите свою почту"/>
                        <button type="submit">Подписаться</button>
                    </form>
                </div>
                <div className={classes.infoSection}>
                    <div className={classes.about}>
                        <p className={classes.footerTitle}>Для клиента</p>
                        <a className={classes.footerLink} href="#">О бренде</a>
                        <a className={classes.footerLink} href="#">Контакты</a>
                    </div>
                    <div className={classes.contacts}>
                        <p className={classes.footerTitle}>Контакты</p>
                        <div>

                        </div>
                    </div>
                    <div className={classes.payments}></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;