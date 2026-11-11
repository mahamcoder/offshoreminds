import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://offshoreminds.com';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.jpeg`;

/**
 * SEO component that injects dynamic <head> meta tags per page.
 *
 * Usage:
 *   <SEO
 *     title="Accounting Services"
 *     description="Professional accounting & bookkeeping for real estate firms."
 *     path="/services/accounting-services"
 *   />
 */
const SEO = ({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords = '',
  schema = null,
}) => {
  const fullTitle = title
    ? `${title} | Offshore Minds`
    : 'Offshore Minds | Real Estate Knowledge Process Outsourcing';

  const url = `${SITE_URL}${path}`;

  const defaultDescription =
    'Offshore Minds provides specialized Knowledge Process Outsourcing (KPO) services for the real estate industry, including financial analysis, asset management support, accounting, and lease administration.';

  const desc = description || defaultDescription;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Offshore Minds" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;

