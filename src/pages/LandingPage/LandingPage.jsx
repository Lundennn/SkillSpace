import { Link } from 'react-router-dom';
import { SiteHeader } from '../../components/layout/SiteHeader';
import { SiteFooter } from '../../components/layout/SiteFooter';
import heroImage from '../../assets/landing-hero.png';
import './LandingPage.css';

export function LandingPage() {
  return (
    <div className="landing" id="home">
      <SiteHeader onSection={(id) => document.getElementById(id)?.scrollIntoView()} />
      <main className="site-width">
        <section className="landing-hero" id="products">
          <div>
            <p className="landing-kicker">Персональный карьерный навигатор</p>
            <h1>Ваша цель.<br /><em>Ваш маршрут.</em><br />Ваш прогресс.</h1>
            <p className="landing-description">Выберите профессию — мы построим индивидуальную карту навыков, покажем точки роста и поможем дойти до цели.</p>
            <div className="landing-actions">
              <Link className="site-pill" to="/register">Построить мой маршрут →</Link>
              <small id="pricing">✓ Первый маршрут бесплатно</small>
            </div>
          </div>
          <img
            className="landing-illustration"
            src={heroImage}
            alt="Девушка за ноутбуком и схема карьерного маршрута"
            width="672"
            height="444"
          />
        </section>
        <section className="landing-cta">
          <p>Начните движение</p>
          <h2>Цель уже выбрана.<br />Построить маршрут?</h2>
          <div className="landing-actions">
            <Link className="site-pill site-pill--dark" to="/register">Создать маршрут →</Link>
            <Link className="site-pill site-pill--outline" to="/login">У меня есть аккаунт</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
