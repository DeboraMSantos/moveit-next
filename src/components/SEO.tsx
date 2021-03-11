
import Head from 'next/head'

interface SEOProps {
  title: string
}

export default function SEO({ title }: SEOProps) {
  return (
    <Head>
      <title>{`${title} | Move.it`}</title>

      <link rel="shortcut icon" href="/favicon.png" />
      <meta name="keywords" content="dmssoftwares,demoramsantos,exercicios, pomodoro, move, mover" />
      <meta name="description" content="um aplicativo para você não ser sedentário e fazer você se mover" />


      <meta property="og:site_name" content="Move it" />
      <meta property="og:title" content="Move it técnica pomodoro" />
      <meta property="og:description" content="um aplicativo para você não ser sedentário e fazer você se mover" />
      <meta property="og:image" content="/thumb.svg" />
      <meta property="og:image:type" content="image/svg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="activity" />

      <meta name="twitter:image" content="/thumb.svg" />
      <meta name="twiiter:image:alt" content="Thumbnail" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Move it" />
      <meta name="twitter:description" content="um aplicativo para você não ser sedentário e fazer você se mover" />
      <meta name="twitter:create" content="dmssoftwares" />
    </Head>
  )
}


