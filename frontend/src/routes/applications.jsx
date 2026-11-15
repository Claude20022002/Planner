/** Routes du lanceur et des tableaux existants, avec leurs protections par rôle conservées. */
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/common/PrivateRoute';
import PageSkeleton from '../components/common/PageSkeleton';
const Applications = lazy(() => import('../pages/Applications'));
const AdminDashboard = lazy(() => import('../pages/dashboard/AdminDashboard'));
const EnseignantDashboard = lazy(() => import('../pages/dashboard/EnseignantDashboard'));
const EtudiantDashboard = lazy(() => import('../pages/dashboard/EtudiantDashboard'));
const ecran = (page, role = null) => <PrivateRoute requiredRole={role}><Suspense fallback={<PageSkeleton />}>{page}</Suspense></PrivateRoute>;
/** Insère les routes dans le routeur principal sans imbriquer un second routeur. */
export const routesApplications = () => [
  <Route key="applications" path="/applications" element={ecran(<Applications />)} />,
  <Route key="admin" path="/dashboard/admin" element={ecran(<AdminDashboard />, 'admin')} />,
  <Route key="enseignant" path="/dashboard/enseignant" element={ecran(<EnseignantDashboard />, 'enseignant')} />,
  <Route key="etudiant" path="/dashboard/etudiant" element={ecran(<EtudiantDashboard />, 'etudiant')} />,
];
