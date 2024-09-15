import { i18n } from "../../../i18n-config";
import "./styles/config.scss"
import { ThemeProvider } from './ThemeContext';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function Root({ children, params }) {
  return (

    <html lang={params.lang}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>

  );
}

export const metadata = {
  title: "Luis Acosta - Portfolio",
  description: "Luis Acosta Portfolio as a Frontend Developer",
};