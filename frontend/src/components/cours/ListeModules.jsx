/** Choisit le rendu de la maquette selon l’écran, sans perdre ses actions. */
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material';
import ListeGestion from '../gestion/ListeGestion';
import LigneModule from './LigneModule';
import CarteModule from './CarteModule';
export default function ListeModules({ modele: m }) {
  const { t, modulesAffiches, ouverts, nombre, nomEnseignant, basculer, ouvrirModule, setASupprimer, ouvrirComposante } = m;
  const telephone = useMediaQuery('(max-width:1199px)');
  if (m.loading || m.erreurChargement || !modulesAffiches.length)
    return (
      <ListeGestion
        lignes={modulesAffiches}
        colonnes={[]}
        cleLigne={(x) => x.id_cours}
        titre={(x) => x.nom_cours}
        actions={() => null}
        chargement={m.loading}
        erreur={m.erreurChargement}
        recharger={m.charger}
        vide={!m.modulesGerables.length}
        creer={m.filieres.length ? () => m.ouvrirModule() : undefined}
      />
    );
  if (telephone)
    return (
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        {modulesAffiches.map((module) => (
          <CarteModule
            key={module.id_cours}
            module={module}
            ouvert={ouverts.has(module.id_cours)}
            nombre={nombre}
            nomEnseignant={nomEnseignant}
            onBasculer={() => basculer(module.id_cours)}
            onModifier={() => ouvrirModule(module)}
            onSupprimer={() => setASupprimer({ type: 'module', item: module })}
            onAjouterComposante={() => ouvrirComposante(module)}
            onModifierComposante={(c) => ouvrirComposante(module, c)}
            onSupprimerComposante={(c) => setASupprimer({ type: 'composante', item: c, module })}
          />
        ))}
      </Box>
    );
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 40 }} />
            <TableCell>{t('ref.curriculum.cols.module')}</TableCell>
            <TableCell>{t('ref.curriculum.cols.program')}</TableCell>
            <TableCell>{t('ref.curriculum.cols.semester')}</TableCell>
            <TableCell>{t('ref.curriculum.cols.components')}</TableCell>
            <TableCell align="right">{t('ref.curriculum.cols.volume')}</TableCell>
            <TableCell align="right">{t('ref.curriculum.cols.ects')}</TableCell>
            <TableCell>{t('ref.curriculum.cols.lead')}</TableCell>
            <TableCell align="right">{t('ref.rooms.cols.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modulesAffiches.map((module) => (
            <LigneModule
              key={module.id_cours}
              module={module}
              ouvert={ouverts.has(module.id_cours)}
              nombre={nombre}
              nomEnseignant={nomEnseignant}
              onBasculer={() => basculer(module.id_cours)}
              onModifier={() => ouvrirModule(module)}
              onSupprimer={() => setASupprimer({ type: 'module', item: module })}
              onAjouterComposante={() => ouvrirComposante(module)}
              onModifierComposante={(c) => ouvrirComposante(module, c)}
              onSupprimerComposante={(c) => setASupprimer({ type: 'composante', item: c, module })}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
