export interface APSCredentials {
  clientId: string;
  clientSecret: string;
}

export interface APSToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: Date;
}

export async function authenticate2Legged(
  credentials: APSCredentials
): Promise<APSToken> {
  const response = await fetch(
    "https://developer.api.autodesk.com/authentication/v2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
        grant_type: "client_credentials",
        scope: "data:read data:write bucket:create bucket:read code:all",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`APS authentication failed: ${response.status}`);
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    tokenType: data.token_type,
    expiresIn: data.expires_in,
    expiresAt: new Date(Date.now() + data.expires_in * 1000),
  };
}
