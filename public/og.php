<?php
/**
 * Offshore Minds - Dynamic Open Graph tag injector for /blogs/{slug}
 * Ensures LinkedIn, Twitter, and WhatsApp crawlers see specific blog title, excerpt, and image.
 * Designed to NEVER throw HTTP 500.
 */

error_reporting(0);
ini_set('display_errors', 0);

$site_url = 'https://offshoreminds.com';
$index_html_path = __DIR__ . '/index.html';

if (!file_exists($index_html_path)) {
    http_response_code(200);
    echo '<!doctype html><html><head><title>Offshore Minds</title></head><body></body></html>';
    exit;
}

$html = file_get_contents($index_html_path);
$slug = trim($_GET['slug'] ?? '', '/');

if (empty($slug)) {
    header('Content-Type: text/html; charset=utf-8');
    echo $html;
    exit;
}

function clean_slug($text) {
    if (empty($text)) return '';
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/i', '-', $text);
    return trim($text, '-');
}

$target_blog = null;
$cache_file = __DIR__ . '/cache_blogs.json';

// 1. Try reading from cache
if (file_exists($cache_file)) {
    $cached = @file_get_contents($cache_file);
    if ($cached) {
        $blogs = json_decode($cached, true) ?: [];
        foreach ($blogs as $b) {
            $b_slug = $b['slug'] ?? clean_slug($b['title'] ?? '');
            if ($b_slug === $slug) {
                $target_blog = $b;
                break;
            }
        }
    }
}

// 2. If not found in cache, fetch from Firestore REST API
if (!$target_blog) {
    $firestore_url = 'https://firestore.googleapis.com/v1/projects/off-shore-mind/databases/(default)/documents/blogs';
    $ctx = stream_context_create([
        'http' => [
            'timeout' => 3,
            'header'  => "User-Agent: OffshoreMinds-OG/1.0\r\n"
        ]
    ]);
    
    $json = @file_get_contents($firestore_url, false, $ctx);
    if ($json) {
        $data = json_decode($json, true);
        if (!empty($data['documents'])) {
            $all_blogs = [];
            foreach ($data['documents'] as $doc) {
                $fields = $doc['fields'] ?? [];
                $title = $fields['title']['stringValue'] ?? '';
                if (empty($title)) continue;
                
                $b_slug = $fields['slug']['stringValue'] ?? clean_slug($title);
                $excerpt = $fields['excerpt']['stringValue'] ?? '';
                if (empty($excerpt)) {
                    $raw_content = $fields['content']['stringValue'] ?? '';
                    $excerpt = substr(strip_tags($raw_content), 0, 200);
                }
                
                $image = $fields['image']['stringValue'] ?? ($site_url . '/favicon.jpeg');
                if (strpos($image, 'http') !== 0) {
                    $image = $site_url . '/' . ltrim($image, '/');
                }
                
                $item = [
                    'title'   => $title,
                    'slug'    => $b_slug,
                    'excerpt' => $excerpt,
                    'image'   => $image,
                ];
                $all_blogs[] = $item;
                
                if ($b_slug === $slug) {
                    $target_blog = $item;
                }
            }
            if (!empty($all_blogs)) {
                @file_put_contents($cache_file, json_encode($all_blogs));
            }
        }
    }
}

// 3. Fallback: humanize the slug if blog not in Firestore yet
if (!$target_blog) {
    $human_title = ucwords(str_replace('-', ' ', $slug));
    $target_blog = [
        'title'   => $human_title,
        'slug'    => $slug,
        'excerpt' => 'Read this blog post on Offshore Minds — real estate knowledge process outsourcing, underwriting, and analytics.',
        'image'   => $site_url . '/favicon.jpeg'
    ];
}

// 4. Inject Open Graph meta tags safely
try {
    $title = htmlspecialchars($target_blog['title'] . ' | Offshore Minds', ENT_QUOTES, 'UTF-8');
    $desc = htmlspecialchars($target_blog['excerpt'], ENT_QUOTES, 'UTF-8');
    $image = htmlspecialchars($target_blog['image'], ENT_QUOTES, 'UTF-8');
    $url = htmlspecialchars($site_url . '/blogs/' . $slug, ENT_QUOTES, 'UTF-8');

    // Replace Title
    $html = preg_replace('/<title>.*?<\/title>/is', '<title>' . $title . '</title>', $html, 1);

    // Replace or Inject Description
    $html = preg_replace('/<meta name="description" content=".*?"\s*\/?>/is', '<meta name="description" content="' . $desc . '" />', $html, 1);

    // Replace or Inject Canonical
    $html = preg_replace('/<link rel="canonical" href=".*?"\s*\/?>/is', '<link rel="canonical" href="' . $url . '" />', $html, 1);

    // Replace Open Graph Tags
    $html = preg_replace('/<meta property="og:type" content=".*?"\s*\/?>/is', '<meta property="og:type" content="article" />', $html, 1);
    $html = preg_replace('/<meta property="og:url" content=".*?"\s*\/?>/is', '<meta property="og:url" content="' . $url . '" />', $html, 1);
    $html = preg_replace('/<meta property="og:title" content=".*?"\s*\/?>/is', '<meta property="og:title" content="' . $title . '" />', $html, 1);
    $html = preg_replace('/<meta property="og:description" content=".*?"\s*\/?>/is', '<meta property="og:description" content="' . $desc . '" />', $html, 1);
    $html = preg_replace('/<meta property="og:image" content=".*?"\s*\/?>/is', '<meta property="og:image" content="' . $image . '" />', $html, 1);

    // Replace Twitter Card Tags
    $html = preg_replace('/<meta name="twitter:url" content=".*?"\s*\/?>/is', '<meta name="twitter:url" content="' . $url . '" />', $html, 1);
    $html = preg_replace('/<meta name="twitter:title" content=".*?"\s*\/?>/is', '<meta name="twitter:title" content="' . $title . '" />', $html, 1);
    $html = preg_replace('/<meta name="twitter:description" content=".*?"\s*\/?>/is', '<meta name="twitter:description" content="' . $desc . '" />', $html, 1);
    $html = preg_replace('/<meta name="twitter:image" content=".*?"\s*\/?>/is', '<meta name="twitter:image" content="' . $image . '" />', $html, 1);
} catch (Exception $e) {
    // Graceful fallback to original html if regex fails
}

header('Content-Type: text/html; charset=utf-8');
echo $html;
