/** Bilan de génération depuis la maquette, sans modification de son contenu métier. */
import { Box, Button, Typography } from '@mui/material';
export default function BilanGeneration({ modele }) {
 const { t, rapport, setRapport } = modele;
 return <>                {rapport && (
                    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1.5, mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {t('ref.teaching.report', { created: rapport.crees, attached: rapport.rattaches ?? 0, existing: rapport.existants, year: rapport.annee_scolaire })}
                        </Typography>
                        {rapport.sans_groupe.length > 0 && (
                            <>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {t('ref.teaching.withoutGroup', { count: rapport.sans_groupe.length })}
                                </Typography>
                                <Box component="ul" sx={{ m: 0, mt: 0.5, pl: 3 }}>
                                    {rapport.sans_groupe.map((s) => (
                                        <Typography component="li" variant="body2" key={`${s.id_cours}-${s.type}`}>
                                            {s.code_cours} · {s.nom_cours} · {s.type} → {t(`ref.groupTypes.${s.niveau_groupe}`)}
                                        </Typography>
                                    ))}
                                </Box>
                            </>
                        )}
                        <Button size="small" onClick={() => setRapport(null)} sx={{ mt: 1 }}>
                            {t('common.close')}
                        </Button>
                    </Box>
                )}</>;
}
