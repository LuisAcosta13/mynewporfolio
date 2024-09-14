import { i18n } from "../../../i18n-config";
import "./styles/config.scss"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function Root({children, params}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "Luis Acosta - Portfolio",
  description: "Luis Acosta Portfolio as a Frontend Developer",
};