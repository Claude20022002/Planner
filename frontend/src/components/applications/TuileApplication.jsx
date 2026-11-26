/** Rend la tuile et son lien clavier, ou une tuile inactive sans lien. Charge les icônes animées. */
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import IconeApplication from './IconeApplication';
import ClocheAnimee from './icones/ClocheAnimee';
import LivreAnime from './icones/LivreAnime';
import CalendrierAnime from './icones/CalendrierAnime';
import DiplomeAnime from './icones/DiplomeAnime';
import ReglagesAnimes from './icones/ReglagesAnimes';
import EtincellesAnimees from './icones/EtincellesAnimees';
import PersonnesAnimees from './icones/PersonnesAnimees';
import { DEGRADES_APPLICATIONS } from './teintes';

const ICONES_ANIMEES = {
  calendar: CalendrierAnime,
  school: DiplomeAnime,
  people: PersonnesAnimees,
  settings: ReglagesAnimes,
  campaign: ClocheAnimee,
  quiz: EtincellesAnimees,
  library: LivreAnime,
};

function IconeAnimee({ nom }) {
  const Icone = ICONES_ANIMEES[nom] ?? ICONES_ANIMEES.calendar;
  return <Icone aria-hidden focusable="false" size={22} strokeWidth={1.8} />;
}

const LienAnime = motion.create(RouterLink);
const REPOS = { scale: 1 };
const AGRANDI = { scale: 1.05 };
const TUILE = { repos: REPOS, survol: AGRANDI, focus: AGRANDI };

export default function TuileApplication({ application, chemin, mouvementReduit, inactive = false }) {
  const { t } = useTranslation();
  const { id, icone } = application;
  const animee = !mouvementReduit && !inactive;
  const externe = id === 'bibliotheque';
  const lien = externe
    ? { component: animee ? motion.a : 'a', href: chemin }
    : { component: animee ? LienAnime : RouterLink, to: chemin };
  const etat = inactive ? { component: 'span', 'aria-disabled': true } : lien;
  const animation = animee
    ? { initial: false, animate: 'repos', whileHover: 'survol', whileFocus: 'focus' }
    : {};

  return (
    <Typography component="h3" sx={{ fontFamily: 'inherit', fontSize: '0.875rem', fontWeight: 650, lineHeight: 1.4 }}>
      <Box
        {...etat}
        {...animation}
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxInlineSize: '100%',
          gap: 1,
          color: inactive ? 'text.disabled' : 'text.primary',
          textDecoration: 'none',
          borderRadius: 2,
          overflowWrap: 'anywhere',
          '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 4 },
          '&:hover .nom-application': inactive ? {} : { textDecoration: 'underline', textUnderlineOffset: '0.16em' },
        }}
      >
        <Box
          component={animee ? motion.span : 'span'}
          {...(animee && { variants: TUILE, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } })}
          data-tuile-application=""
          sx={{
            display: 'grid',
            placeItems: 'center',
            inlineSize: { xs: 96, md: 120 },
            maxInlineSize: '100%',
            aspectRatio: '1',
            borderRadius: { xs: '25px', md: '30px' },
            backgroundImage: inactive ? 'none' : DEGRADES_APPLICATIONS[id],
            bgcolor: inactive ? 'action.disabledBackground' : 'primary.dark',
            color: inactive ? 'text.disabled' : 'oklch(0.99 0.006 255)',
            boxShadow: inactive ? 'none' : 'inset 0 0 0 1px oklch(1 0 0 / 0.15)',
            '& svg': { inlineSize: { xs: 36, md: 44 }, blockSize: { xs: 36, md: 44 } },
          }}
        >
          {animee ? <IconeAnimee nom={icone} /> : <IconeApplication nom={icone} />}
        </Box>
        <Box component="span" className="nom-application">
          {t('applications.' + id + '.titre')}
        </Box>
      </Box>
    </Typography>
  );
}
