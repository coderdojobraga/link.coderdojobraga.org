import Head from 'next/head';
import { ConfigProvider } from 'antd';
import { IAccount } from '~/models/Account';
import { AdminContextProvider } from '~/components/Admin/Context';
import Navbar from '~/components/Admin/Navbar';
import Footer from '~/components/Footer';

import 'antd/dist/antd.css';

interface AdminLayoutProps {
  currentUser: IAccount;
  tab: string;
  children: React.ReactNode;
}

export default function AdminLayout({ currentUser, tab, children }: AdminLayoutProps) {
  return (
    <AdminContextProvider initialState={{}}>
      <Head>
        <title>Admin • CoderDojo Braga</title>
      </Head>
      <ConfigProvider componentSize="large">
        <Navbar selected={tab} user={currentUser} />
        {children}
        <Footer />
      </ConfigProvider>
    </AdminContextProvider>
  );
}
