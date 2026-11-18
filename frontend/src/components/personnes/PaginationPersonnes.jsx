/** Pagination identique sur les listes paginées existantes, sans débordement sur téléphone. */
import { Box, TablePagination } from '@mui/material';
export default function PaginationPersonnes({ total, page, changerPage, taille, changerTaille }) {
  return <Box sx={{ mt: 1, '& .MuiTablePagination-toolbar': { flexWrap: 'wrap', justifyContent: 'flex-end', px: 0, gap: 0.5 }, '& .MuiTablePagination-spacer': { display: 'none' }, '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { my: 1 }, '& .MuiTablePagination-actions': { marginInlineStart: '8px' } }}>
    <TablePagination component="div" count={total} page={page} onPageChange={(_, p) => changerPage(p)}
      rowsPerPage={taille} onRowsPerPageChange={(e) => { changerTaille(Number(e.target.value)); changerPage(0); }}
      rowsPerPageOptions={[5, 10, 25, 50]} />
  </Box>;
}
