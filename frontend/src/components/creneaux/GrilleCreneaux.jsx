/** Grille d'ordinateur : une ligne par rang, une colonne par jour, une case vide marquée d'un tiret. */
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ds } from '../../design-system/tokens';
import CaseCreneau from './CaseCreneau';

export default function GrilleCreneaux({ modele: m }) {
  const { t } = m;
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" sx={{ tableLayout: 'fixed', minWidth: 720 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 64 }}>{t('ref.grids.rank')}</TableCell>
            {m.jours.map((jour) => (
              <TableCell key={jour}>{t(`ref.days.${jour}`)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {m.rangs.map((rang) => (
            <TableRow key={rang}>
              <TableCell sx={{ fontFamily: ds.font.board, fontWeight: 600, color: 'text.secondary' }}>{rang}</TableCell>
              {m.jours.map((jour) => {
                const creneau = m.cellule(jour, rang);
                return creneau ? (
                  <TableCell key={jour} sx={{ p: 0.5 }}>
                    <CaseCreneau creneau={creneau} modele={m} />
                  </TableCell>
                ) : (
                  <TableCell key={jour} sx={{ color: 'text.secondary' }}>
                    -
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
