import {ContactForm} from './contact-form';

export const metadata = {title: 'Contact us'};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold">Contact us</h1>
      <p className="mt-1 text-sm text-gray-500">
        We usually reply within 1–2 business days.
      </p>
      <ContactForm />
    </div>
  );
}
