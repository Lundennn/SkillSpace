const clientId = 'web';

async function request(path, { body, accessToken } = {}) {
  let response;
  try {
    response = await fetch(`/api/v1/auth/${path}`, {
      method: body !== undefined || path === 'logout' ? 'POST' : 'GET',
      headers: {
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error('Сервис авторизации недоступен. Попробуйте ещё раз.');
  }

  if (!response.ok) {
    const retryAfter = Number(response.headers.get('Retry-After'));
    const messages = {
      400: path.endsWith('/verify')
        ? 'Код неверный или устарел. Проверьте последнее письмо.'
        : 'Проверьте введённые данные.',
      401: path === 'login' ? 'Неверная почта или пароль.' : 'Сессия завершена. Войдите снова.',
      429: retryAfter > 0
        ? `Слишком много попыток. Повторите через ${retryAfter} сек.`
        : 'Слишком много попыток. Попробуйте позже.',
    };
    const error = new Error(messages[response.status] ?? 'Сервис авторизации недоступен. Попробуйте ещё раз.');
    error.status = response.status;
    throw error;
  }

  return response.status === 204 ? undefined : response.json();
}

export const startRegistration = (email, password) =>
  request('registrations', { body: { email, password } });

export const startLogin = (email, password) =>
  request('login', { body: { email, password, clientId } });

export const verifyRegistration = (challengeId, code) =>
  request('registrations/verify', { body: { challengeId, code } });

export const verifyLogin = (challengeId, code) =>
  request('login/verify', { body: { challengeId, code, clientId } });

export const listSessions = (accessToken) => request('sessions', { accessToken });
export const logout = (accessToken) => request('logout', { accessToken });
