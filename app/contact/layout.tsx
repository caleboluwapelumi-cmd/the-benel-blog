import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with the BenEl Marketing Hub team. Questions, collaborations, or guest post submissions welcome.',
    openGraph: {
        title: 'Contact BenEl Marketing Hub',
        description: 'Get in touch with our team.',
        url: 'https://benelmarketinghub.com/contact',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
