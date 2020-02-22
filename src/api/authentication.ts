interface BlizzardAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const AuthAPI = {
  async getApiAccessToken(clientId: string, clientSecret: string): Promise<BlizzardAccessToken> {
    // auth on blizz api
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials');

    const headers = new Headers();
    headers.append('Authorization', `Basic ${btoa(`${clientId}:${clientSecret}`)}`)

    const result = await fetch('https://eu.battle.net/oauth/token', {
      method: 'POST',
      body: formData,
      headers
    });

    return result.json();
  }
}
