import { getDictionary } from "../get-dictionary.js";
import About from "./components/home/About.js";
import Title from "./components/home/Title.js";
import Menu from "./components/menu/Menu.js";
import Reviews from "./components/home/Reviews.js"
import { ThemeProvider } from './ThemeContext';
import "./styles/page.scss"
import Skills from "./components/home/Skills.js";

export default async function IndexPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang);

  return (
      <div className="main-page">
        <Menu lang={lang} dictionary={dictionary}></Menu>
        <div className="main-content">

          <Title dictionary={dictionary} />
          <About dictionary={dictionary} />
          <Skills skills={dictionary.skills} />
          <Reviews recommendations={dictionary.recommendations} />
        </div>
      </div>
  );
}