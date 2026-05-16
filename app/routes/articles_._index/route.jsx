import { baseMeta } from '~/utils/meta';
import { getPosts } from './posts.server';
import { json } from '@remix-run/cloudflare';

export async function loader() {
  const allPosts = await getPosts();
  const featured = allPosts.filter(post => post.frontmatter.featured)[0];
  const posts = allPosts.filter(post => featured?.slug !== post.slug);

  return json({ posts, featured });
}

export function meta() {
  return baseMeta({
    title: 'Portfolio',
    description:
      'A collection of portfolio projects with context and explanations.',
  });
}

export { Articles as default } from './articles';
