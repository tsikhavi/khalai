import {ProjectWizard} from './wizard';

export const metadata = {title: 'Start a project'};

export default function StartPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Start a project
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Six quick questions. About two minutes.
        </p>
      </header>

      <ProjectWizard />
    </main>
  );
}
