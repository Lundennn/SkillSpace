import { useNavigate } from 'react-router-dom';
import { CenteredLayout } from '../../components/layout/CenteredLayout';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';

export const EmailConfirmationSuccessfulPage = () => {
  const navigate = useNavigate();

  return (
    <CenteredLayout
      backText="К регистрации"
      backTo="/register"
      cardMaxWidth="510px"
    >
      <div className="success-card-content">
        <div className="success-icon-circle" aria-hidden="true">
          <Icon name="mail" size={24} />
        </div>

        <h1 className="confirm-card-title">Почта подтверждена</h1>
        <p className="success-card-description">
          Адрес привязан к вашему профилю. Можно перейти к настройке
          дополнительной защиты.
        </p>

        <Button
          type="button"
          variant="accent"
          fullWidth={false}
          onClick={() => navigate('/2fa')}
        >
          <span>Настроить защиту</span>
          <Icon name="arrow-right" size={16} />
        </Button>
      </div>
    </CenteredLayout>
  );
};