<?php
/**
 * Offshore Minds - RSS 2.0 Blog Feed Generator
 * Compliant with LinkedIn External Content Sources specifications.
 * Caches Firestore response for 15 minutes.
 */

header('Content-Type: application/rss+xml; charset=utf-8');
header('X-Robots-Tag: noindex, follow');

$site_url = 'https://offshoreminds.com';
$cache_file = __DIR__ . '/cache_blogs.json';
$cache_lifetime = 900; // 15 minutes

// Static default blogs fallback
$static_blogs = [
    [
        'title' => 'Artificial Intelligence in Commercial Real Estate: The 2025 Breakthrough',
        'slug' => 'artificial-intelligence-in-commercial-real-estate-the-2025-breakthrough',
        'excerpt' => 'The commercial real estate (CRE) industry in the U.S. is experiencing one of the most transformative periods in its history, driven by the explosive rise of Artificial Intelligence (AI).',
        'category' => 'Market Trends & Analytics',
        'author' => 'Sarah J.',
        'image' => $site_url . '/assets/cover.webp',
        'pubDate' => 'Sat, 12 Oct 2024 00:00:00 +0000',
        'timestamp' => strtotime('2024-10-12')
    ],
    [
        'title' => 'Why Investors Are More Interested in Multifamily Assets',
        'slug' => 'why-investors-are-more-interested-in-multifamily-assets',
        'excerpt' => 'Multifamily real estate remains a top investor choice thanks to steady demand, resilient cash flow, and rising rents, even during downturns.',
        'category' => 'Real Estate Financial Analysis',
        'author' => 'Mike R.',
        'image' => $site_url . '/assets/cover.webp',
        'pubDate' => 'Sat, 28 Sep 2024 00:00:00 +0000',
        'timestamp' => strtotime('2024-09-28')
    ],
    [
        'title' => 'Cap Rate Trends in U.S. Hospitality: What Investors Are Paying',
        'slug' => 'cap-rate-trends-in-u-s-hospitality-what-investors-are-paying',
        'excerpt' => 'The U.S. hospitality sector in 2025 shows a complex investment landscape with stabilized cap rates and normalized debt costs around 6.0%–6.5%.',
        'category' => 'Financial Modeling',
        'author' => 'Jessica T.',
        'image' => $site_url . '/assets/cover.webp',
        'pubDate' => 'Sun, 15 Sep 2024 00:00:00 +0000',
        'timestamp' => strtotime('2024-09-15')
    ],
    [
        'title' => 'Understanding GAAP Compliance in Real Estate Accounting',
        'slug' => 'understanding-gaap-compliance-in-real-estate-accounting',
        'excerpt' => 'Navigating the complexities of Generally Accepted Accounting Principles (GAAP) is crucial for real estate firms to maintain regulatory compliance.',
        'category' => 'Accounting & Compliance',
        'author' => 'David L.',
        'image' => $site_url . '/assets/cover.webp',
        'pubDate' => 'Thu, 22 Aug 2024 00:00:00 +0000',
        'timestamp' => strtotime('2024-08-22')
    ]
];

function generate_slug($text) {
    if (empty($text)) return '';
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/i', '-', $text);
    return trim($text, '-');
}

function xml_escape($str) {
    return htmlspecialchars((string)$str, ENT_XML1 | ENT_QUOTES, 'UTF-8');
}

$blogs = [];

// Check cache
if (file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_lifetime)) {
    $cached = @file_get_contents($cache_file);
    if ($cached) {
        $blogs = json_decode($cached, true) ?: [];
    }
}

// Fetch from Firestore if cache is stale or empty
if (empty($blogs)) {
    $firestore_url = 'https://firestore.googleapis.com/v1/projects/off-shore-mind/databases/(default)/documents/blogs';
    
    $ctx = stream_context_create([
        'http' => [
            'timeout' => 5,
            'header'  => "User-Agent: OffshoreMinds-FeedGenerator/1.0\r\n"
        ]
    ]);
    
    $json = @file_get_contents($firestore_url, false, $ctx);
    
    if ($json) {
        $data = json_decode($json, true);
        if (!empty($data['documents'])) {
            foreach ($data['documents'] as $doc) {
                $fields = $doc['fields'] ?? [];
                
                // Exclude drafts if draft status field exists
                $status = $fields['status']['stringValue'] ?? 'published';
                if ($status === 'draft') continue;
                
                $title = $fields['title']['stringValue'] ?? '';
                if (empty($title)) continue;
                
                $slug = $fields['slug']['stringValue'] ?? generate_slug($title);
                $excerpt = $fields['excerpt']['stringValue'] ?? '';
                if (empty($excerpt)) {
                    $raw_content = $fields['content']['stringValue'] ?? '';
                    $excerpt = substr(strip_tags($raw_content), 0, 200);
                }
                
                $category = $fields['category']['stringValue'] ?? 'General';
                $author = $fields['author']['stringValue'] ?? 'Offshore Minds';
                $image = $fields['image']['stringValue'] ?? ($site_url . '/favicon.jpeg');
                if (strpos($image, 'http') !== 0) {
                    $image = $site_url . '/' . ltrim($image, '/');
                }
                
                // Date parsing (RFC 822)
                $created_time = $doc['createTime'] ?? null;
                $timestamp = $created_time ? strtotime($created_time) : time();
                if (isset($fields['createdAt']['timestampValue'])) {
                    $timestamp = strtotime($fields['createdAt']['timestampValue']);
                } elseif (isset($fields['date']['stringValue'])) {
                    $t = strtotime($fields['date']['stringValue']);
                    if ($t) $timestamp = $t;
                }
                
                $pubDate = gmdate('D, d M Y H:i:s +0000', $timestamp);
                
                $blogs[] = [
                    'title' => $title,
                    'slug' => $slug,
                    'excerpt' => $excerpt,
                    'category' => $category,
                    'author' => $author,
                    'image' => $image,
                    'pubDate' => $pubDate,
                    'timestamp' => $timestamp
                ];
            }
        }
    }
    
    // Merge or fallback to static blogs if Firestore was empty
    if (empty($blogs)) {
        $blogs = $static_blogs;
    } else {
        // Sort newest first
        usort($blogs, function($a, $b) {
            return ($b['timestamp'] ?? 0) - ($a['timestamp'] ?? 0);
        });
    }
    
    // Save to cache
    @file_put_contents($cache_file, json_encode($blogs));
}

// Slice latest 20 published posts
$blogs = array_slice($blogs, 0, 20);

// Build RSS 2.0 XML
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Offshore Minds Blog</title>
    <link><?= $site_url ?>/blogs</link>
    <description>CRE market trends, underwriting and outsourcing insights from Offshore Minds.</description>
    <language>en-us</language>
    <atom:link href="<?= $site_url ?>/rss.xml" rel="self" type="application/rss+xml"/>
<?php foreach ($blogs as $blog): 
    $post_url = $site_url . '/blogs/' . rawurlencode($blog['slug']);
    $image_url = $blog['image'] ?? ($site_url . '/favicon.jpeg');
    $image_type = (stripos($image_url, '.png') !== false) ? 'image/png' : 'image/jpeg';
?>
    <item>
      <title><?= xml_escape($blog['title']) ?></title>
      <link><?= xml_escape($post_url) ?></link>
      <guid isPermaLink="true"><?= xml_escape($post_url) ?></guid>
      <pubDate><?= xml_escape($blog['pubDate']) ?></pubDate>
      <dc:creator><?= xml_escape($blog['author']) ?></dc:creator>
      <category><?= xml_escape($blog['category']) ?></category>
      <description><?= xml_escape($blog['excerpt']) ?></description>
      <media:content url="<?= xml_escape($image_url) ?>" medium="image" type="<?= $image_type ?>" width="1200" height="627"/>
    </item>
<?php endforeach; ?>
  </channel>
</rss>
