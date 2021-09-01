import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { withCurrentUser } from '~/lib/auth';
import { IAccount } from '~/models/Account';
import AdminLayout from '~/components/Admin/Layout';
import LinksTable from '~/components/Admin/LinksTable';
import FormsTable from '~/components/Admin/FormsTable';
import RedirectsTable from '~/components/Admin/RedirectsTable';
import AccountsTable from '~/components/Admin/AccountsTable';
import { navbar as entries } from '~/components/Admin/Navbar';

import 'antd/dist/antd.css';

export const getServerSideProps = withCurrentUser();

export default function Admin({ currentUser }: { currentUser: IAccount }) {
  const router = useRouter();
  const { tab } = router.query;

  useEffect(() => {
    if (!tab || tab instanceof Array || !(tab in entries)) {
      router.push('/admin?tab=links');
    }
  }, [router, tab]);

  return (
    <AdminLayout tab={tab instanceof Array ? tab[0] : tab} currentUser={currentUser}>
      {tab === 'links' && <LinksTable />}
      {tab === 'forms' && <FormsTable />}
      {tab === 'redirects' && <RedirectsTable />}
      {tab === 'accounts' && <AccountsTable />}
    </AdminLayout>
  );
}
