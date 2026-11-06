import {redirect} from 'next/navigation';
import {apiFetch} from '@/lib/api-server';
import {getCurrentUser} from '@/lib/auth';
import ProfileForm from './profile-form';
import PasswordForm from './password-form';
import PreferencesForm from './preferences-form';
import AppearanceForm from './appearance-form';

type Preferences = {
  productUpdates: boolean;
  projectActivity: boolean;
  invoiceReceipts: boolean;
  marketing: boolean;
};

export const metadata = {title: 'Settings'};

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  let preferences: Preferences;
  try {
    preferences = await apiFetch<Preferences>('/api/users/me/preferences', {
      cache: 'no-store',
    });
  } catch {
    preferences = {
      productUpdates: true,
      projectActivity: true,
      invoiceReceipts: true,
      marketing: false,
    };
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header>
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Settings
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Manage your profile, security, notifications, and appearance.
        </p>
      </header>

      <Section
        id="profile"
        title="Profile"
        description="Your public information across Khalai Studio.">
        <ProfileForm user={user} />
      </Section>

      <Section
        id="security"
        title="Security"
        description="Change your password. You'll stay signed in on this device.">
        <PasswordForm />
      </Section>

      <Section
        id="notifications"
        title="Notifications"
        description="Choose which emails and alerts you receive.">
        <PreferencesForm initial={preferences} />
      </Section>

      <Section
        id="appearance"
        title="Appearance"
        description="Theme and display preferences for this browser.">
        <AppearanceForm />
      </Section>
    </div>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20">
      <div className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {title}
        </h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        {children}
      </div>
    </section>
  );
}
