import { getDictionary } from "../get-dictionary.js";
import Title from "./components/home/Title.js";
import Menu from "./components/menu/Menu.js";
import Reviews from "./components/home/Reviews.js"
import "./styles/page.scss"
import Skills from "./components/home/Skills.js";
import Experience from "./components/home/Experience.js";
import SkyBackground from "./components/SkyBackground.js";
import About from "./components/home/About.js";
import Projects from "./components/home/Projects.js";

export default async function IndexPage({ params: { lang } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="main-page">
      <SkyBackground />
      <Menu lang={lang} dictionary={dictionary} />
      <div className="main-content">
        <Title dictionary={dictionary} lang={lang} />
        <About dictionary={dictionary} />
        <Skills skills={dictionary.skills} />
        <Experience experience={dictionary.experience} skills={dictionary.skillsNode} />
        <Projects projects={dictionary.projects} />
        <Reviews recommendations={dictionary.recommendations} />
      </div>
    </div>
  );
}