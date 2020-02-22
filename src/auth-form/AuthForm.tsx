import * as React from 'react';

import './auth-form.scss';
import { AuthAPI } from '../api/authentication';

interface Props {
  fetchData: () => void;
}

export const authenticate = async (): Promise<void> => {
  const token = await AuthAPI.getApiAccessToken(
    localStorage.getItem('clientId') || '',
    localStorage.getItem('clientSecret') || ''
  );

  localStorage.setItem('token', token.access_token);
}

export const AuthForm: React.FC<Props> = (props: Props) => {
  const [clientId, setClientId] = React.useState<string>('')
  const [clientSecret, setClientSecret] = React.useState<string>('')

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    localStorage.setItem('clientId', clientId);
    localStorage.setItem('clientSecret', clientSecret);

    authenticate()

    window.setInterval(async () => authenticate(), 80000);

    props.fetchData();
  }

  const handleClientIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setClientId(event.target.value);
  }

  const handleClientSecretChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setClientSecret(event.target.value);
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <input name="username" placeholder="Client ID" type="text" value={clientId} onChange={handleClientIdChange} />
      <input name="password" placeholder="Client secret" type="text" value={clientSecret} onChange={handleClientSecretChange} />
      <br />
      <br />
      <button type="submit">Connect</button>
    </form>
  );
}
