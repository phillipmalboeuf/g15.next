import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import styles from '@/styles/Page.module.scss'
import { Entry } from 'contentful'
import { ContentService, getPageProps, Navigations, Page } from '@/services/content'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Contenu } from '@/components/Contenu'

interface Props {
  title: string
  page: Entry<Page>
  navigation?: Navigations
}

const Home: FunctionComponent<Props> = ({ title, page, navigation }) => {
  return (
    page && <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={page.fields.description} />
      </Head>
      <main className={styles.main}>
        <Contenu contenu={page.fields.contenu} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return await getPageProps(context, 'accueil')
}


export default Home

// import { GetStaticProps } from 'next'
// import { FunctionComponent } from 'react'
// import Head from 'next/head'
// import styles from '@/styles/Page.module.scss'
// import { Entry } from 'contentful'
// import { ContentService, getPageProps, Navigations, Page } from '@/services/content'
// import { Header } from '@/components/Header'
// import { Footer } from '@/components/Footer'
// import { Contenu } from '@/components/Contenu'
// import Button from '@/components/Button'
// import Center from '@/components/Center'
// import { Media } from '@/components/Media'
// import Image from 'next/image'
// import TitleCard from '@/components/TitleCard'
// import groupephoto from '../public/images/lac-a-lepaule.jpg'

// interface Props {
//   title: string
//   page: Entry<Page>
//   navigation?: Navigations
// }

// const items = [
//   {id: 1, name: 'item 1'},
//   {id: 2, name: 'item 2'},
//   {id: 3, name: 'item 3'},
//   {id: 4, name: 'item 4'},
//   {id: 5, name: 'item 5'},
//   {id: 6, name: 'item 6'},
//   {id: 7, name: 'item 1'},
//   {id: 8, name: 'item 2'},
//   {id: 9, name: 'item 3'},
//   {id: 10, name: 'item 4'},
//   {id: 11, name: 'item 5'},
//   {id: 12, name: 'item 6'},
//   {id: 13, name: 'item 1'},
//   {id: 14, name: 'item 2'},
//   {id: 15, name: 'item 3'},
//   {id: 16, name: 'item 4'},
//   {id: 17, name: 'item 5'},
//   {id: 18, name: 'item 6'},
// ]

// const publications = [
//   {id: 1, name: 'item 1'},
//   {id: 2, name: 'item 1'},
//   {id: 3, name: 'item 1'},
//   {id: 4, name: 'item 1'},
// ]

// const Home: FunctionComponent<Props> = ({ title, page, navigation }) => {
//   return (
//     page && <>
//       <Head>
//         <title>G15+</title>
//         <meta name="description" content={page.fields.description} />
//       </Head>
//       <Header nav={navigation.header} />
//       <main className={styles.main}>
//         {/* <Contenu contenu={page.fields.contenu} /> */}
//         <section 
//           id='hero'
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: 690,
//             width: '100%',
//             paddingTop: 56,
//           }}
//         >
//           <Center>
//             <h1>Pour une société solidaire, prospère et verte au Québec</h1>
//             <div style={{display: 'flex'}}>
//             <Button label='Lisez notre vision'/>
//             </div>
//           </Center>
//         </section>
//         <section
//           id='#nos-chantiers'
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: 690,
//             width: '100%',
//             // backgroundColor: '#3EAF59',
//           }}
//         >
//           <Center>
//             <TitleCard label='Nos orientations' />
//             <h3>Le collectif est le fruit d’un dialogue entre une quinzaine d’organisations de la société civile. Voici nos 12 orientations pour transformer le Québec.</h3>
//           </Center>
//         </section>
//         {/* FLASHCARDS */}
//         <section
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: 690,
//             width: '100%',
//             //backgroundColor: '#3EAF59',
//           }}
//         >
//           <Center>
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <h4 style={{display: 'flex', flex: 1, paddingRight: 24}}>Un Québec qui place l’économie au service de la qualité de vie de sa population</h4>
//               <div
//                 style={{
//                   display: 'flex',
//                   flex: 1,
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   height: '100%',
//                 }}
//               >
//               </div>
//             </div>
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <h4 style={{display: 'flex', flex: 1, paddingRight: 24}}>Un Québec qui place l’économie au service de la qualité de vie de sa population</h4>
//               <div
//                 style={{
//                   display: 'flex',
//                   flex: 1,
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   height: '100%',
//                 }}
//               >
//               </div>
//             </div>
//           </Center>
//         </section>
//         <section
//           id='#qui-sommes-nous'
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: 690,
//             width: '100%',
//             backgroundImage: `url(${groupephoto.src})`,
//           }}
//         >
//           <div style={{position:'absolute', zIndex: 0, display: 'flex', flex: 1, height: 690, width: '100%', opacity: 0.5}} />
//           <Center>
//           <TitleCard label='Qui sommes-nous?' color='#FEFEFE' />
//             <h3 style={{fontSize: 32, color: '#FEFEFE'}}>Le collectif G15+ s’appuie sur le dialogue social pour favoriser la transformation de l’économie québécoise vers une société plus solidaire, prospère et verte et placer le bien-être de la population au cœur des politiques publiques. Fondé en mars 2020, il est composé de leaders économiques, syndicaux, sociaux et environnementaux du Québec.</h3>
//           </Center>
//         </section>
//         {/* MEMBRES */}
//         <section
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             //justifyContent: 'center',
//             minHeight: 690,
//             width: '100%',
//           }}
//         >
//           <Center>
//             <h4>Nos membres</h4>
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 flexWrap: 'wrap',
//                 flex: 1,
//                 //backgroundColor: 'cyan',
//               }}
//             >
//               {items.map((item) => (
//                 <div
//                 key={item.id}
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   flex: '0 0 33.33%',
//                   paddingTop: 40,
//                   //backgroundColor: 'orange',
//                 }}
//               >
//                 <Image
//                   style={{
//                     height: 80,
//                     width: 80,
//                     borderRadius: 99,
//                     objectFit: 'cover',
//                   }}
//                   alt='Membres'
//                   height={80}
//                   width={80}
//                   src={'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'} 
//                 />
//                 <div style={{paddingTop: 16}}>
//                   <h4 style={{fontSize: 18}}>Saba Khann</h4>
//                   <h4 style={{fontSize: 18}}><em>Directrice générale, Québec / Atlantique</em></h4>
//                   <h4 style={{fontSize: 18, paddingTop: 12, opacity: 0.5}}>Fondation David Suzuki</h4>
//                 </div>
//               </div>
//               ))}
//             </div>
//           </Center>
//           {/* <Center>
//             <h4>Nos partenaires</h4>
//           </Center> */}
          

//         </section>
//         {/* SALLE DE PRESSE */}
//         <section
//           id='salle-de-presse'
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             minHeight: 690,
//             width: '100%',
//           }}
//         >
//           <Center>
//             <TitleCard label='Nos publications' />
//             <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
//             {publications.map((publication) => (
//               <div
//               key={publication.id}
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 flex: '0 0 25%',
//                 paddingTop: 40,
//                 paddingRight: 16,
//                 //backgroundColor: 'orange',
//               }}
//             >
//               <div style={{display: 'flex', width: '100%', backgroundColor: 'black', marginBottom: 16, alignItems: 'center'}}>
//                 <h4 style={{fontSize: 18, color: 'white', padding: 8}}>Communiqués</h4>
//               </div>
//               <Image
//                 style={{
//                   height: '100%',
//                   width: '100%',
//                   objectFit: 'cover',
//                 }}
//                 alt='blue'
//                 height={80}
//                 width={80}
//                 src={'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'} 
//               />
//               <div style={{paddingTop: 16}}>
//                 <h4 style={{fontSize: 18}}>Saba Khann</h4>
//                 <h4 style={{fontSize: 18, paddingTop: 12, opacity: 0.5}}>Date</h4>
//               </div>
//             </div>
//             ))}
//             </div>
//             <div style={{display: 'flex', justifyContent: 'center', marginTop: 64}}>
//               <Button label='Voir tous'/>
//             </div>
//           </Center>
//         </section>
//       </main>
//       <Footer footer={navigation.footer} social={navigation.social} legal={navigation.legal} />
//     </>
//   )
// }

// export const getStaticProps: GetStaticProps<Props> = async (context) => {
//   return await getPageProps(context, 'accueil')
// }


// export default Home