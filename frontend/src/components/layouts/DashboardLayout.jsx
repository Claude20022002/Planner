import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Button,
  Breadcrumbs,
  Link,
  Badge,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Apps, Notifications, Search, Menu as MenuIcon } from '@mui/icons-material';
import ThemeGestion from '../common/ThemeGestion';
import GlobalSearch from '../common/GlobalSearch';
import SelecteurEspaces from '../espaces/SelecteurEspaces';
import Aide from '../aide/Aide';
import LienEvitement, { ID_CONTENU } from './LienEvitement';
import OngletsDuBas from './OngletsDuBas';
import MenuApplication from '../applications/MenuApplication';
import CompteApplications from '../applications/CompteApplications';
import { construireApplications, trouverApplication } from '../applications/catalogue';
import { Link as RouterLink } from 'react-router-dom';
import { bottomTabsFor, cleDuTitre, navigationFor } from './navigation';
import { useAuth } from '../../contexts/AuthContext';
import { notificationAPI } from '../../services/api';
import useTitreOnglet from '../../hooks/useTitreOnglet';

const RAIL_WIDTH = 248;

/** Coquille commune : barre d’outils, accueil des applications et menu du module courant. */
export default function DashboardLayout({ children }) {
  const { pathname } = useLocation();
  const pilote = pathname === '/applications' || [
    '/gestion/utilisateurs',
    '/gestion/enseignants',
    '/gestion/etudiants',
    '/gestion/filieres',
    '/gestion/groupes',
    '/gestion/cours',
    '/gestion/enseignements',
  ].includes(pathname);
  return <ThemeGestion actif={pilote}><ContenuDashboard>{children}</ContenuDashboard></ThemeGestion>;
}

function ContenuDashboard({ children }) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery('(min-width:900px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  const role = user?.role;
  const navigation = useMemo(() => navigationFor(user), [user]);
  const applications = useMemo(() => construireApplications(navigation), [navigation]);
  const application = trouverApplication(applications, location.pathname);
  const accueilApplications = location.pathname === '/applications';
  const bottomTabs = useMemo(() => bottomTabsFor(role), [role]);
  const showBottomTabs = !accueilApplications && !isDesktop && (role === 'etudiant' || role === 'enseignant');

  useEffect(() => {
    if (!user?.id_user) return undefined;
    const load = async () => {
      try {
        const data = await notificationAPI.getNonLues(user.id_user);
        const nonLues = data?.data || data || [];
        setUnread(nonLues.length);
      } catch {
        setUnread(0);
      }
    };
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [user?.id_user, user?.role]);

  const handleLogout = async () => {
    await logout();
    navigate('/connexion');
  };

  const go = (path) => {
    // La bibliothèque (StudyLib) est une autre application sur la même origine : navigation complète
    if (path.startsWith('/biblio')) {
      window.location.assign(path);
      return;
    }
    navigate(path);
    setDrawerOpen(false);
  };

  const title = t(cleDuTitre(location.pathname));
  useTitreOnglet(title);
  const rail = <MenuApplication application={application} sections={navigation} chemin={location.pathname} aller={go} deconnecter={handleLogout} />;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <LienEvitement />
      {!accueilApplications && (isDesktop ? (
        <Box sx={{ width: RAIL_WIDTH, flexShrink: 0 }}>
          <Box sx={{ position: 'fixed', top: 0, bottom: 0, insetInlineStart: 0, width: RAIL_WIDTH }}>{rail}</Box>
        </Box>
      ) : (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: RAIL_WIDTH, bgcolor: 'background.paper' } }}
        >
          {rail}
        </Drawer>
      ))}

      <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="sticky"
          sx={{
            top: 0,
            zIndex: (theme) => theme.zIndex.appBar,
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderBottomColor: 'divider',
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 56, md: 64 }, px: { xs: 1, sm: 2, md: 3 }, gap: 0.5, flexWrap: 'wrap', py: { xs: 0.5, md: 0 } }}>
            {!isDesktop && !accueilApplications && (
              <IconButton aria-label={t('nav.menu')} onClick={() => setDrawerOpen(true)} sx={{ color: 'inherit' }}>
                <MenuIcon />
              </IconButton>
            )}
            <Tooltip title={t('applications.retour')}>
              <IconButton component={RouterLink} to="/applications" aria-label={t('applications.retour')} sx={{ color: 'inherit', minWidth: 44, minHeight: 44 }}><Apps /></IconButton>
            </Tooltip>
            <Box sx={{ flexGrow: 1, minWidth: 80, marginInlineStart: 1 }}>
              {application && <Breadcrumbs aria-label={t('applications.titre')} sx={{ fontSize: 12, display: { xs: 'none', sm: 'block' } }}>
                <Link component={RouterLink} to="/applications" color="inherit" underline="hover">{t('applications.titre')}</Link>
                <Link component={RouterLink} to={application.chemin} color="inherit" underline="hover">{t(`applications.${application.id}.titre`)}</Link>
              </Breadcrumbs>}
              <Typography component="h1" noWrap sx={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: { xs: 16, md: 18 } }}>{title}</Typography>
            </Box>
            {accueilApplications && <Button component={RouterLink} to={`/dashboard/${role}`} sx={{ display: { xs: 'none', md: 'inline-flex' }, textTransform: 'none', fontFamily: 'Inter, sans-serif' }}>{t(role === 'admin' ? 'nav.dashboard' : 'nav.board')}</Button>}
            <Aide aller={go} />
            <SelecteurEspaces role={role} />
            <CompteApplications aller={go} deconnecter={handleLogout} />
            {role === 'admin' && (
              <Tooltip title={t('nav.search')}>
                <IconButton onClick={() => setSearchOpen(true)} aria-label={t('nav.search')} sx={{ color: 'inherit' }}>
                  <Search />
                </IconButton>
              </Tooltip>
            )}
            {!showBottomTabs && (
              <Tooltip title={t('nav.notifications')}>
                <IconButton onClick={() => go('/notifications')} aria-label={t('nav.notifications')} sx={{ color: 'inherit' }}>
                  <Badge badgeContent={unread} color="secondary">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          id={ID_CONTENU}
          tabIndex={-1}
          sx={{
            outline: 'none',
            flexGrow: 1,
            px: { xs: 1.5, sm: 2, md: 3 },
            pt: { xs: 1.5, md: 3 },
            pb: showBottomTabs ? 'calc(72px + env(safe-area-inset-bottom))' : { xs: 2, md: 4 },
            width: '100%',
            maxWidth: 1480,
            mx: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>

      {showBottomTabs && <OngletsDuBas onglets={bottomTabs} nonLues={unread} aller={go} />}

      {role === 'admin' && <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />}
    </Box>
  );
}
