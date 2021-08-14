import { GetStaticProps } from 'next';
import Image from 'next/image';
import Layout from '~/components/Layout';
import Card from '~/components/Card';

import dbConnect from '~/lib/database';
import Link, { ILink } from '~/models/Link';

import styles from '~/styles/Home.module.css';

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();

  const result = await Link.find({}).sort({ index: 'asc' });
  const links = result.map((doc) => {
    const link = doc.toObject();
    link._id = link._id.toString();
    link.created = link.created.toString();
    return link;
  });

  return { props: { links: links }, revalidate: 5 };
};

export default function Home({ links }: { links: ILink[] }) {
  return (
    <Layout title="CeSIUM">
      <Image src="/2020.png" alt="CeSIUM's T-shirt 2020/21" width={150} height={150} />

      <h1 className={styles.title}>CeSIUM</h1>

      <p className={styles.description}>Centro de Estudantes de Engenharia Informática da UMinho</p>

      <div className={styles.grid}>
        {links.map((link) => (
          <Card key={link._id} {...link} />
        ))}
      </div>
    </Layout>
  );
}