import './second.css';
import SecondShell from './SecondShell.tsx';
import SecondHero from './SecondHero.tsx';
import SecondProof from './SecondProof.tsx';
import SecondMarquee from './SecondMarquee.tsx';
import SecondExperience from './SecondExperience.tsx';
import SecondProjects from './SecondProjects.tsx';
import SecondSkills from './SecondSkills.tsx';
import SecondChampionsCta from './SecondChampionsCta.tsx';
import SecondContact from './SecondContact.tsx';
import SecondFooter from './SecondFooter.tsx';

export default function SecondPage() {
  return (
    <SecondShell>
      <SecondHero />
      <SecondProof />
      <SecondMarquee />
      <SecondExperience />
      <SecondProjects />
      <SecondSkills />
      <SecondChampionsCta />
      <SecondContact />
      <SecondFooter />
    </SecondShell>
  );
}
