'use client';

//import { useLocale } from 'next-intl';

export function SocialLoginButtons() {
  //const locale = useLocale();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // e.g., http://localhost:4000

  const login = (provider: 'google' | 'github' | 'x' | 'facebook') => {
    // This navigates the user to your NestJS backend, which starts the OAuth flow
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={() => login('google')}
        className="...">
        Sign in with Google
      </button>
      <button
        onClick={() => login('github')}
        className="...">
        Sign in with GitHub
      </button>
      {/* Add buttons for X and Facebook */}
    </div>
  );
}
