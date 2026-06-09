import gamestackTexture2Large from '~/assets/gamestack-list-large.jpg';
import gamestackTexture2Placeholder from '~/assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from '~/assets/gamestack-list.jpg';
import gamestackTextureLarge from '~/assets/gamestack-login-large.jpg';
import gamestackTexturePlaceholder from '~/assets/gamestack-login-placeholder.jpg';
import gamestackTexture from '~/assets/gamestack-login.jpg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import sprTextureLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import sprTexturePlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import sprTexture from '~/assets/spr-lesson-builder-dark.jpg';
import projectFourTextureLarge from '~/assets/projectFourTextureLarge.png';
import projectFourTexturePlaceholder from '~/assets/projectFourTexturePlaceholder.png';
import projectFourTexture from '~/assets/projectFourTexture.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Full Stack Progammer + GameDeveloper',
    description: `The portfolio of ${config.name} — a Full Stack Game Progammer, especialized in Unity and Unreal Engine and founder of 32 Bits Studio`,
 });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const aboutMe = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, aboutMe];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Dracula: Crimson Apostle"
        description="In this horror escape room, a prequel to the novel Dracula, you play as Renfield.
        Solve puzzles, survive the trials of the enigmatic Countess Dolingen of Gratz, and escape the horrors that haunt you — both outside and within your mind.
        Is your fate written in blood?"
        buttonText="View Steam Page"
        buttonLink="https://store.steampowered.com/app/3307230/Dracula_Crimson_Apostle/"
        model={{
          type: 'laptop',
          alt: 'Dracula: Crimson Apostle',
          textures: [
            {
              srcSet: `${sprTexture} 1280w, ${sprTextureLarge} 2560w`,
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="JavaScript, React and Phaser 3 projects"
        description="Developmen of different apps for web browser and mobile using React"
        buttonText="View the repos at my Github page"
        buttonLink="https://github.com/adiazlop"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${gamestackTexture} 375w, ${gamestackTextureLarge} 750w`,
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: `${gamestackTexture2} 375w, ${gamestackTexture2Large} 750w`,
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
  id="project-4"
  sectionRef={projectFour}
  visible={visibleSections.includes(projectFour.current)}
  index={4}
  title="One Paradox (IOC Award Winner 2024)"
  description="My CGFS final project, a first-person narrative adventure whose story revolved around animal exploitation, environmentalism, and a critique of the 2030 Sustainable Development Goals. "
  buttonText="View Steam Page"
  buttonLink="https://store.steampowered.com/app/3028130/One_Paradox/"
  model={{
    type: 'laptop', // or 'phone'
    alt: 'Steam Page Capture',
    textures: [
      {
        srcSet: `${projectFourTexture} 1280w, ${projectFourTextureLarge} 2560w`,
        placeholder: projectFourTexturePlaceholder,
      },
    ],
  }}
/>
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Awarded Game Jam Projects"
        description="These projects, ranging from Destí de Drac (Best Gameplay Award - GameJump 2025) to En algun Multivers estaré bé (Best Art Award - Girona Game Jam), showcase some of my works during my student years while learning Unity, C#, and Object-Oriented Programming."
        buttonText="View Itch.io page"
        buttonLink="https://punished-toni.itch.io/"
        model={{
          type: 'laptop',
          alt: 'Game Jam Projects',
          textures: [
            {
              srcSet: `${sliceTexture} 800w, ${sliceTextureLarge} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      
      <Profile
        sectionRef={aboutMe}
        visible={visibleSections.includes(aboutMe.current)}
        id="about-me"
      />
      <Footer />
    </div>
  );
};
